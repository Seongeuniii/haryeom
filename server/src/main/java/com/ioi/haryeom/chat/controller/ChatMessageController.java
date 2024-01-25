package com.ioi.haryeom.chat.controller;

import com.ioi.haryeom.chat.dto.ChatMessageRequest;
import com.ioi.haryeom.chat.service.ChatMessageService;
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

    // TODO: 임시 member Id
    private final Long memberId = 2L;

    private final ChatMessageService chatMessageService;

    // 프론트에서 채팅방에 연결되었음을 받음
    @MessageMapping("/chatroom/{chatRoomId}/connect")
    public void connectChatRoom(@DestinationVariable Long chatRoomId, SimpMessageHeaderAccessor headerAccessor) {
        log.info("[CONNECT] CHAT ROOM ID {}", chatRoomId);
        String sessionId = headerAccessor.getSessionId();
        chatMessageService.connectChatRoom(chatRoomId, sessionId, memberId);
    }

    @EventListener
    public void disconnectChatRoom(SessionDisconnectEvent event) {
        log.info("[DISCONNECT] CHAT ROOM");
        chatMessageService.disconnectChatRoom(event.getSessionId());
    }

    // 채팅 메시지 보내기
    @MessageMapping("/chatroom/{chatRoomId}/message")
    public void sendChatMessage(@DestinationVariable Long chatRoomId, @Payload ChatMessageRequest request,
        SimpMessageHeaderAccessor headerAccessor) {
        log.info("[SEND CHAT MESSAGE] CHAT ROOM ID : {} CONTENT : {}", chatRoomId, request.getContent());
        chatMessageService.sendChatMessage(chatRoomId, request.getContent(), headerAccessor.getSessionId());
    }
}
