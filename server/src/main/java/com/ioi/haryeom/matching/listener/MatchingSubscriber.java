package com.ioi.haryeom.matching.listener;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ioi.haryeom.auth.exception.MatchingOperationException;
import com.ioi.haryeom.matching.document.Matching;
import com.ioi.haryeom.matching.document.MatchingResult;
import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.dto.MatchingStatus;
import com.ioi.haryeom.matching.dto.RespondToMatchingResponse;
import java.util.List;
import java.util.stream.Collectors;
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
            log.info("[RECEIVE MESSAGE] status {}, chatRoomId {}", status, chatRoomId);
            switch (status) {
                case REQUEST:
                    handleRequest(rootNode, chatRoomId);
                    break;
                case RESPONSE:
                    handleResponse(rootNode, chatRoomId);
                    break;
                default:
                    log.warn("[RECEIVE MESSAGE] UNKNOWN STATUS : {}", status);
            }
        } catch (Exception e) {
            throw new MatchingOperationException("매칭 메시지를 처리하는 도중 오류가 발생했습니다.", e);
        }
    }

    private void handleRequest(JsonNode rootNode, Long chatRoomId) throws Exception {
        CreateMatchingResponse response = objectMapper.readValue(rootNode.get("response").toString(), CreateMatchingResponse.class);
        log.info("[HANDLE REQUEST] matchingId : {}", response.getMatchingId());
        messagingTemplate.convertAndSend(String.format("/topic/chatroom/%d%s", chatRoomId, "/request"), response);
    }

    private void handleResponse(JsonNode rootNode, Long chatRoomId) throws Exception {
        List<RespondToMatchingResponse> responses = objectMapper.readValue(rootNode.get("response").toString(), new TypeReference<>() {
        });
        messagingTemplate.convertAndSend(String.format("/topic/chatroom/%d%s", chatRoomId, "/response"), responses);
    }

    public ChannelTopic getChannelTopic() {
        return CHANNEL_TOPIC;
    }
}