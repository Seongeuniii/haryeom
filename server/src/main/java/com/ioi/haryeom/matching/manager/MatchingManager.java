package com.ioi.haryeom.matching.manager;

import com.ioi.haryeom.matching.dto.CreateMatchingRequest;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class MatchingManager {

    private final Map<String, CreateMatchingRequest> matchingMap = new ConcurrentHashMap<>();

    public void addMatching(String matchingId, CreateMatchingRequest matchingRequest) {
        matchingMap.put(matchingId, matchingRequest);
    }

    public CreateMatchingRequest getMatchingRequestByMatchingId(String matchingId) {
        return matchingMap.get(matchingId);
    }

    public void removeMatchingRequestByMatchingId(String matchingId) {
        matchingMap.remove(matchingId);
    }

}
