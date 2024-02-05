package com.ioi.haryeom.chat.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ioi.haryeom.chat.dto.ChatMessageEvent;
import com.ioi.haryeom.chat.exception.ChatMessageBadRequestException;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class ChatMessageSubscriber implements MessageListener {

    private static final ChannelTopic CHANNEL_TOPIC = new ChannelTopic("chatroom");
    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;



    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            ChatMessageEvent event = objectMapper.readValue(message.getBody(), ChatMessageEvent.class);
            messagingTemplate.convertAndSend("/topic/chatroom/" + event.getChatRoomId(), event.getChatMessageResponse());
        } catch (IOException e) {
            throw new ChatMessageBadRequestException();
        }
    }

    public ChannelTopic getChannelTopic() {
        return CHANNEL_TOPIC;
    }
}
