package com.ioi.haryeom.video.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class StompLoggingInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (accessor.getCommand() == null) {
            // STOMP 연결 이벤트가 아닌 경우
            return message;
        }
        switch (accessor.getCommand()) {
            case CONNECT:
                log.info("STOMP WebSocket connection established. Session ID: {}", accessor.getSessionId());
                log.info("CONNECT message : {}", accessor.getMessage());
                log.info("CONNECT heartbeat : {}", accessor.getHeartbeat());
                break;
            case DISCONNECT:
                log.info("STOMP WebSocket connection closed. Session ID: {}", accessor.getSessionId());
                break;
            default:
                // 다른 STOMP 명령에 대한 처리
                break;
        }
        return message;
    }
}
