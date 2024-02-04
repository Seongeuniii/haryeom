package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.chat.document.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.domain.ChatRoomState;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.manager.WebSocketSessionManager;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.chat.repository.ChatRoomStateRepository;
import com.ioi.haryeom.matching.manager.MatchingManager;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageService {


    private static final String CHAT_ROOM_CHANNEL_NAME = "chatroom";

    private final SimpMessagingTemplate messagingTemplate;
    private final RedisTemplate<String, Object> redisTemplate;
    private final WebSocketSessionManager sessionManager;
    private final MatchingManager matchingManager;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomStateRepository chatRoomStateRepository;

    @Transactional
    public void connectChatRoom(Long chatRoomId, String sessionId, Long memberId) {

        sessionManager.addSession(chatRoomId, sessionId, memberId);

        // 채팅방의 매칭 요청 여부 확인 및 클라이언트에 전송
        Optional.ofNullable(matchingManager.getMatchingRequestByChatRoomId(chatRoomId))
            .ifPresent(response -> messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoomId + "/request", response));

        // 채팅방의 매칭 응답 여부 확인 및 클라이언트에 전송
        Optional.ofNullable(matchingManager.getMatchingResponseByChatRoomId(chatRoomId))
            .filter(respondList -> !respondList.isEmpty())
            .ifPresent(respondList -> messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoomId + "/response", respondList));
    }

    @Transactional
    public void disconnectChatRoom(String sessionId) {
        sessionManager.removeSession(sessionId);
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
            redisTemplate.convertAndSend(CHAT_ROOM_CHANNEL_NAME, savedChatMessage);
        }

    private void recoverChatRoomStateIfDeleted(ChatRoom chatRoom, Member oppositeMember) {
        // 만약 메시지를 받는 반대 회원이 채팅방을 나갔으면, 채팅방 목록에 보이도록 복구한다.
        chatRoomStateRepository.findByChatRoomAndMember(chatRoom, oppositeMember)
            .filter(ChatRoomState::getIsDeleted)
            .ifPresent(ChatRoomState::recover);
    }
}
