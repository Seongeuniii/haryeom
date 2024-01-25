package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.chat.domain.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.dto.ChatMessageResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.manager.WebSocketSessionManager;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageService {

    private final WebSocketSessionManager sessionManager;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    public void connectChatRoom(Long chatRoomId, String sessionId, Long memberId) {
        sessionManager.addSession(chatRoomId, sessionId, memberId);
    }

    public void disconnectChatRoom(String sessionId) {
        //TODO: lastReadMessageId와 업데이트하는 로직 추가
        sessionManager.removeSession(sessionId);
    }

    public void sendChatMessage(Long chatRoomId, String content, String sessionId) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));

        Long memberId = sessionManager.findMemberIdBySessionId(sessionId);
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        ChatMessage chatMessage = ChatMessage.builder()
            .chatRoom(chatRoom)
            .senderMember(member)
            .messageContent(content)
            .build();
        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        ChatMessageResponse response = ChatMessageResponse.from(savedChatMessage);
        
        messagingTemplate.convertAndSend(String.format("/topic/chatrooms/%s", chatRoomId), response);
    }
}
