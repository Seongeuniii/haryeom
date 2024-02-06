package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.chat.document.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.domain.ChatRoomState;
import com.ioi.haryeom.chat.dto.ChatMessageEvent;
import com.ioi.haryeom.chat.dto.ChatMessageResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.exception.ChatRoomStateNotFoundException;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.chat.repository.ChatRoomStateRepository;
import com.ioi.haryeom.matching.document.MatchingResult;
import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.dto.MatchingResponse;
import com.ioi.haryeom.matching.dto.MatchingStatus;
import com.ioi.haryeom.matching.dto.RespondToMatchingResponse;
import com.ioi.haryeom.matching.repository.MatchingRepository;
import com.ioi.haryeom.matching.repository.MatchingResultRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageService {


    private static final String SESSION_MEMBER_NAME = "websocket:session:member:";
    private static final String SESSION_CHAT_ROOM_NAME = "websocket:session:chatRoom:";
    private static final String CHAT_ROOM_MEMBER_NAME = "websocket:chatRoom:member:";

    private static final String MATCHING_CHANNEL_NAME = "matching";
    private static final String CHAT_ROOM_CHANNEL_NAME = "chatroom";
    private final MatchingRepository matchingRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final MatchingResultRepository matchingResultRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomStateRepository chatRoomStateRepository;

    @Transactional
    public void connectChatRoom(Long chatRoomId, String sessionId, Long memberId) {

        redisTemplate.opsForValue().set(SESSION_MEMBER_NAME + sessionId, memberId);
        redisTemplate.opsForValue().set(SESSION_CHAT_ROOM_NAME + sessionId, chatRoomId);
        redisTemplate.opsForSet().add(CHAT_ROOM_MEMBER_NAME + chatRoomId, memberId);

        log.info("[CONNECT CHAT ROOM] MEMBER SIZE : {}", redisTemplate.opsForSet().size(CHAT_ROOM_MEMBER_NAME + chatRoomId));
        // 채팅방의 매칭 요청 여부 확인 및 클라이언트에 전송
        matchingRepository.findByChatRoomId(chatRoomId).ifPresent(matching ->
            redisTemplate.convertAndSend(MATCHING_CHANNEL_NAME,
                new MatchingResponse<>(chatRoomId, MatchingStatus.REQUEST, CreateMatchingResponse.from(matching))));

        // 채팅방의 매칭 응답 여부 확인 및 클라이언트에 전송
        List<MatchingResult> matchingResults = matchingResultRepository.findAllByChatRoomIdOrderByIdDesc(chatRoomId);
        if (!matchingResults.isEmpty()) {
            List<RespondToMatchingResponse> responses = matchingResults.stream()
                .map(RespondToMatchingResponse::from)
                .collect(Collectors.toList());
            redisTemplate.convertAndSend(MATCHING_CHANNEL_NAME, new MatchingResponse<>(chatRoomId, MatchingStatus.RESPONSE, responses));
        }
    }

    @Transactional
    public void disconnectChatRoom(String sessionId) {
        Long memberId = Long.valueOf(Objects.requireNonNull(redisTemplate.opsForValue().get(SESSION_MEMBER_NAME + sessionId)).toString());
        Long chatRoomId = Long.valueOf(Objects.requireNonNull(redisTemplate.opsForValue().get(SESSION_CHAT_ROOM_NAME + sessionId)).toString());
        redisTemplate.delete(SESSION_MEMBER_NAME + sessionId);
        redisTemplate.delete(SESSION_CHAT_ROOM_NAME + sessionId);
        redisTemplate.opsForSet().remove((CHAT_ROOM_MEMBER_NAME + chatRoomId), memberId);
    }

    @Transactional
    public void sendChatMessage(Long chatRoomId, String content, String sessionId, Long memberId) {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));

        Member oppositeMember = chatRoom.getOppositeMember(member);
        recoverChatRoomStateIfDeleted(chatRoom, oppositeMember);

        ChatMessage chatMessage = ChatMessage.builder()
            .chatRoomId(chatRoomId)
            .memberId(memberId)
            .content(content)
            .build();

        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        // 현재 연결되어 있는 회원 lastReadMessageId 업데이트
        Set<Object> connectedMemberIds = redisTemplate.opsForSet().members(CHAT_ROOM_MEMBER_NAME + chatRoomId);
        if (connectedMemberIds != null) {
            connectedMemberIds.forEach(connectedMemberIdObject -> {
                Long connectedMemberId = Long.valueOf(connectedMemberIdObject.toString());
                if (member.getId().equals(connectedMemberId) || oppositeMember.getId().equals(connectedMemberId)) {
                    ChatRoomState chatRoomState = chatRoomStateRepository.findByChatRoomAndMemberAndIsDeletedIsFalse(chatRoom,
                            member.getId().equals(connectedMemberId) ? member : oppositeMember)
                        .orElseThrow(ChatRoomStateNotFoundException::new);
                    chatRoomState.updateLastReadMessageId(savedChatMessage.getId().toHexString());
                }
            });
        }
        redisTemplate.convertAndSend(CHAT_ROOM_CHANNEL_NAME,
            new ChatMessageEvent(savedChatMessage.getChatRoomId(), ChatMessageResponse.from(savedChatMessage)));
    }

    private void recoverChatRoomStateIfDeleted(ChatRoom chatRoom, Member oppositeMember) {
        // 만약 메시지를 받는 반대 회원이 채팅방을 나갔으면, 채팅방 목록에 보이도록 복구한다.
        chatRoomStateRepository.findByChatRoomAndMember(chatRoom, oppositeMember)
            .filter(ChatRoomState::getIsDeleted)
            .ifPresent(ChatRoomState::recover);
    }
}
