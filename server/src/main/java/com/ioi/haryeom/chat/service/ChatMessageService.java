package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.chat.domain.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatMessageBefore;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.dto.ChatMessageResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.manager.WebSocketSessionManager;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.chat.repository.ChatMessageRepositoryBefore;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.manager.MatchingManager;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageService {

    private final WebSocketSessionManager sessionManager;
    private final MatchingManager matchingManager;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatMessageRepositoryBefore chatMessageRepositoryBefore;

    @Transactional
    public void connectChatRoom(Long chatRoomId, String sessionId, Long memberId) {
        sessionManager.addSession(chatRoomId, sessionId, memberId);

        // 채팅방의 매칭 요청 여부 확인
        if (matchingManager.existMatchingRequestByChatRoomId(chatRoomId)) {
            CreateMatchingResponse response = matchingManager.getTutoringMatchingRequestByChatRoomId(
                chatRoomId);
            // 클라이언트에 매칭 요청 전송
            messagingTemplate.convertAndSend("/topic/chatroom/" + response.getChatRoomId() + "/request", response);
        }
    }

    public void disconnectChatRoom(String sessionId) {
        //TODO: lastReadMessageId와 업데이트하는 로직 추가
        sessionManager.removeSession(sessionId);
    }

    @Transactional

    public void sendChatMessage(Long chatRoomId, String content, String sessionId) {

        Long memberId = sessionManager.getMemberIdBySessionId(sessionId);

        ChatMessage chatMessage = ChatMessage.builder()
            .chatRoomId(chatRoomId)
            .memberId(memberId)
            .content(content)
            .build();

        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        ChatMessageResponse response = ChatMessageResponse.from(savedChatMessage);

        messagingTemplate.convertAndSend(String.format("/topic/chatroom/%s", chatRoomId), response);
    }


    @Transactional
    public void sendChatMessageBefore(Long chatRoomId, String content, String sessionId) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));

        Long memberId = sessionManager.getMemberIdBySessionId(sessionId);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        ChatMessageBefore chatMessageBefore = ChatMessageBefore.builder()
            .chatRoom(chatRoom)
            .senderMember(member)
            .messageContent(content)
            .build();
        ChatMessageBefore savedChatMessageBefore = chatMessageRepositoryBefore.save(chatMessageBefore);

//        ChatMessageResponse response = ChatMessageResponse.from(savedChatMessageBefore);

//        messagingTemplate.convertAndSend(String.format("/topic/chatroom/%s", chatRoomId), response);
    }
}
