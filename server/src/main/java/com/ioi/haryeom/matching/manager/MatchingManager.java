package com.ioi.haryeom.matching.manager;

import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.dto.RespondToMatchingResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class MatchingManager {

    private final Map<String, CreateMatchingResponse> matchingMap = new ConcurrentHashMap<>();

    private final Map<Long, String> chatRoomMatchingRequestMap = new ConcurrentHashMap<>();
    private final Map<Long, List<RespondToMatchingResponse>> chatRoomMatchingResponseMap = new ConcurrentHashMap<>();


    /**
     * 과외 매칭 요청 정보
     */
    public void addMatchingRequest(String matchingId, Long chatRoomId, CreateMatchingResponse matchingResponse) {
        matchingMap.put(matchingId, matchingResponse);
        chatRoomMatchingRequestMap.put(chatRoomId, matchingId);
    }
    public CreateMatchingResponse getMatchingRequestByMatchingId(String matchingId) {
        return matchingMap.get(matchingId);
    }

    public void removeMatchingRequestByMatchingId(String matchingId) {
        if (matchingMap.containsKey(matchingId)) {
            Long chatRoomId = getChatRoomId(matchingId);
            chatRoomMatchingRequestMap.remove(chatRoomId);
            matchingMap.remove(matchingId);
        }
    }

    public Long getChatRoomId(String matchingId) {
        return chatRoomMatchingRequestMap.entrySet().stream()
            .filter(entry -> matchingId.equals(entry.getValue()))
            .map(Map.Entry::getKey)
            .findFirst()
            .orElse(null);
    }

    public CreateMatchingResponse getMatchingRequestByChatRoomId(Long chatRoomId) {
        String matchingId = chatRoomMatchingRequestMap.get(chatRoomId);
        return matchingMap.get(matchingId);
    }
    public boolean existsMatchingRequestByChatRoomId(Long chatRoomId) {
        return chatRoomMatchingRequestMap.containsKey(chatRoomId);
    }
    public boolean existsMatchingRequestByMatchingId(String matchingId) {
        return matchingMap.containsKey(matchingId);
    }


    /**
     * 과외 매칭 응답 정보
     */
    public void addMatchingResponse(Long chatRoomId, RespondToMatchingResponse matchingResponse) {
        chatRoomMatchingResponseMap.computeIfAbsent(chatRoomId, k -> new ArrayList<>()).add(matchingResponse);
    }

    public List<RespondToMatchingResponse> getMatchingResponseByChatRoomId(Long chatRoomId) {
        return chatRoomMatchingResponseMap.get(chatRoomId);
    }

    public boolean existsMatchingResponseByChatRoomId(Long chatRoomId) {
        return chatRoomMatchingResponseMap.containsKey(chatRoomId) && !chatRoomMatchingResponseMap.get(chatRoomId).isEmpty();
    }

    public void updateMatchingResponse(Long chatRoomId, List<RespondToMatchingResponse> updatedResponses) {
        chatRoomMatchingResponseMap.put(chatRoomId, updatedResponses);
    }

}
