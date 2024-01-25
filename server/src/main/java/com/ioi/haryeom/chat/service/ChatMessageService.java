package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.chat.manager.WebSocketSessionManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageService {

    private final WebSocketSessionManager sessionManager;

    public void connectChatRoom(Long chatRoomId, String sessionId, Long memberId) {
        sessionManager.addSession(chatRoomId, sessionId, memberId);
    }

    public void disconnectChatRoom(String sessionId) {
        //TODO: lastReadMessageId와 업데이트하는 로직 추가
        sessionManager.removeSession(sessionId);
    }
}
