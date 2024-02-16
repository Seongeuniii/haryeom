package com.ioi.haryeom.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

@Configuration
public class WebSocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer {

    @Override
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
        messages
            .simpDestMatchers("/app/chatroom/**").authenticated() // "/app/**" 경로로 들어오는 메시지는 인증이 필요함
            .anyMessage().authenticated(); // 모든 메시지에 대해 인증 요구
    }

    @Override
    protected boolean sameOriginDisabled() {
        // CSRF 보호를 비활성화 (WebSocket에서는 CSRF 공격에 취약하지 않음)
        return true;
    }
}
