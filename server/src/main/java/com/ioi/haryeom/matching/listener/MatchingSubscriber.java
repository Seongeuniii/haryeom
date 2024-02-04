package com.ioi.haryeom.matching.listener;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ioi.haryeom.auth.exception.MatchingOperationException;
import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.dto.MatchingStatus;
import com.ioi.haryeom.matching.dto.RespondToMatchingResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
public class MatchingSubscriber implements MessageListener {

    private static final ChannelTopic CHANNEL_TOPIC = new ChannelTopic("matching");
    private final ObjectMapper objectMapper;

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            JsonNode rootNode = objectMapper.readTree(message.getBody());
            MatchingStatus status = MatchingStatus.valueOf(rootNode.get("status").asText());
            Long chatRoomId = rootNode.get("chatRoomId").asLong();
            log.info("status {} chatRoomId {}", status, chatRoomId);
            switch (status) {
                case REQUEST:
                    CreateMatchingResponse createResponse = objectMapper.readValue(rootNode.get("response").toString(), CreateMatchingResponse.class);
                    messagingTemplate.convertAndSend(String.format("/topic/chatroom/%d%s", chatRoomId, "/request"), createResponse);
                    break;
                case RESPONSE:
                    JsonNode responseNode = rootNode.get("response");
                    List<Object> responseList = objectMapper.readValue(responseNode.toString(), new TypeReference<List<Object>>() {});
                    List<RespondToMatchingResponse> respondResponse = new ArrayList<>();
                    if (responseList.size() == 2 && responseList.get(0).equals("java.util.ArrayList")) {
                        List<Map<String, Object>> data = (List<Map<String, Object>>) responseList.get(1);
                        for (Map<String, Object> item : data) {
                            String className = (String) item.get("@class");
                            if (className != null && className.equals("com.ioi.haryeom.matching.dto.RespondToMatchingResponse")) {
                                RespondToMatchingResponse response = objectMapper.convertValue(item, RespondToMatchingResponse.class);
                                respondResponse.add(response);
                            }
                        }
                    }
                    messagingTemplate.convertAndSend(String.format("/topic/chatroom/%d%s", chatRoomId, "/response"), respondResponse);
                    break;
            }
        } catch (Exception e) {
            throw new MatchingOperationException("매칭 메시지를 처리하는 도중 오류가 발생했습니다.", e);
        }
    }

    public ChannelTopic getChannelTopic() {
        return CHANNEL_TOPIC;
    }
}