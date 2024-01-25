package com.ioi.haryeom.chat.manager;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class WebSocketSessionManager {

    private final Map<String, Long> sessionMemberMap = new ConcurrentHashMap<>();
    private final Map<String, Long> sessionChatRoomMap = new ConcurrentHashMap<>();
    private final Map<String, String> sessionMatchingMap = new ConcurrentHashMap<>();

    public void addSession(Long chatRoomId, String sessionId, Long memberId) {
        sessionMemberMap.put(sessionId, memberId);
        sessionChatRoomMap.put(sessionId, chatRoomId);
    }

    public void removeSession(String sessionId) {
        sessionMemberMap.remove(sessionId);
        sessionChatRoomMap.remove(sessionId);
    }
}
