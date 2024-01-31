package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.chat.document.ChatMessage;
import com.ioi.haryeom.chat.dto.ChatMessageResponse;
import com.ioi.haryeom.chat.manager.WebSocketSessionManager;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.dto.RespondToMatchingResponse;
import com.ioi.haryeom.matching.manager.MatchingManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatMessageService {

    private final WebSocketSessionManager sessionManager;
    private final MatchingManager matchingManager;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageRepository chatMessageRepository;

    @Transactional
    public void connectChatRoom(Long chatRoomId, String sessionId, Long memberId) {

        sessionManager.addSession(chatRoomId, sessionId, memberId);

        // 채팅방의 매칭 요청 여부 확인
        if (matchingManager.existsMatchingRequestByChatRoomId(chatRoomId)) {
            CreateMatchingResponse response = matchingManager.getMatchingRequestByChatRoomId(chatRoomId);
            // 클라이언트에 매칭 요청 전송
            messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoomId + "/request", response);
        }
        // 채팅방의 매칭 응답 여부 확인
        if(matchingManager.existsMatchingResponseByChatRoomId(chatRoomId)) {
            List<RespondToMatchingResponse> respondList = matchingManager.getMatchingResponseByChatRoomId(chatRoomId);
            // 클라이언트에 매칭 응답 전송
            messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoomId + "/response", respondList);
        }

    }

    @Transactional
    public void disconnectChatRoom(String sessionId) {
        //TODO: lastReadMessageId와 업데이트하는 로직 추가
        sessionManager.removeSession(sessionId);
    }

    @Transactional
    public void sendChatMessage(Long chatRoomId, String content, String sessionId) {

        Long memberId = sessionManager.getMemberIdBySessionId(sessionId);

        ChatMessage chatMessage = ChatMessage.builder()
            .chatRoomId(chatRoomId)
            .memberId(memberId)
            .content(content)
            .build();

        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        ChatMessageResponse response = ChatMessageResponse.from(savedChatMessage);

        messagingTemplate.convertAndSend(String.format("/topic/chatroom/%s", chatRoomId), response);
    }
}
