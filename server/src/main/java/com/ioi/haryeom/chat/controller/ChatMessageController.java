package com.ioi.haryeom.chat.controller;

import com.ioi.haryeom.chat.dto.ChatMessageRequest;
import com.ioi.haryeom.chat.service.ChatMessageService;
import com.ioi.haryeom.common.util.AuthMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    // 프론트에서 채팅방에 연결되었음을 받음
    @MessageMapping("/chatroom/{chatRoomId}/connect")
    public void connectChatRoom(@DestinationVariable Long chatRoomId, SimpMessageHeaderAccessor headerAccessor, @AuthMemberId Long memberId) {
        String sessionId = headerAccessor.getSessionId();
        log.info("[CONNECT CHAT ROOM] CHAT ROOM ID : {}, session ID : {}", chatRoomId, sessionId);
        chatMessageService.connectChatRoom(chatRoomId, sessionId, memberId);
    }

    @EventListener
    public void disconnectChatRoom(SessionDisconnectEvent event) {
        log.info("[DISCONNECT CHAT ROOM] CHAT ROOM session ID : {}", event.getSessionId());
        chatMessageService.disconnectChatRoom(event.getSessionId());
    }

    // 채팅 메시지 보내기
    @MessageMapping("/chatroom/{chatRoomId}/message")
    public void sendChatMessage(@DestinationVariable Long chatRoomId, @Payload ChatMessageRequest request,
        SimpMessageHeaderAccessor headerAccessor, @AuthMemberId Long memberId) {
        log.info("[SEND CHAT MESSAGE] CHAT ROOM ID : {} SESSION ID : {} CONTENT : {}", chatRoomId, headerAccessor.getSessionId(),
            request.getContent());
        chatMessageService.sendChatMessage(chatRoomId, request.getContent(), headerAccessor.getSessionId(), memberId);
    }
}
