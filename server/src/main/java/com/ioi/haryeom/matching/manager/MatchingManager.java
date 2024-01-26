package com.ioi.haryeom.matching.manager;

import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class MatchingManager {

    private final Map<String, CreateMatchingResponse> matchingMap = new ConcurrentHashMap<>();
    private final Map<Long, String> chatRoomMatchingMap = new ConcurrentHashMap<>();

    public void addTutoringMatching(String matchingId, CreateMatchingResponse matchingResponse) {
        matchingMap.put(matchingId, matchingResponse);
        chatRoomMatchingMap.put(matchingResponse.getChatRoomId(), matchingId);
    }

    public CreateMatchingResponse getTutoringMatchingRequestByMatchingId(String matchingId) {
        return matchingMap.get(matchingId);
    }

    public void removeTutoringMatchingRequestByMatchingId(String matchingId) {
        chatRoomMatchingMap.remove(matchingMap.get(matchingId).getChatRoomId());
        matchingMap.remove(matchingId);
    }

    public CreateMatchingResponse getTutoringMatchingResponseByChatRoomId(Long chatRoomId) {
        String matchingId = chatRoomMatchingMap.get(chatRoomId);
        return matchingMap.get(matchingId);
    }

    public boolean existMatchingResponseByChatRoomId(Long chatRoomId) {
        return chatRoomMatchingMap.containsKey(chatRoomId);
    }

}
