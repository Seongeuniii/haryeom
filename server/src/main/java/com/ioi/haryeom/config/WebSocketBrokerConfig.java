package com.ioi.haryeom.config;

import com.ioi.haryeom.common.interceptor.StompLoggingInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketBrokerConfig implements WebSocketMessageBrokerConfigurer {

    private final StompLoggingInterceptor stompLoggingInterceptor;

    public WebSocketBrokerConfig(StompLoggingInterceptor stompLoggingInterceptor) {
        this.stompLoggingInterceptor = stompLoggingInterceptor;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        registry.addEndpoint("/signal") //최초 소켓 연결
            .setAllowedOriginPatterns("*")
            .withSockJS();

        registry.addEndpoint("/chatroom") //최초 소켓 연결
            .setAllowedOriginPatterns("*")
            .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app"); // 가공 후 넘길 때
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registry) {
        registry.interceptors(stompLoggingInterceptor);
    }

    @Override
    public void configureClientOutboundChannel(ChannelRegistration registry) {
        registry.interceptors(stompLoggingInterceptor);
    }

}
