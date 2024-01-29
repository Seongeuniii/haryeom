package com.ioi.haryeom.chat.dto;

import com.ioi.haryeom.chat.domain.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatMessageBefore;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ChatMessageResponse {

    private final String messageId;
    private final Long senderMemberId;
    private final String content;
    private final LocalDateTime createdAt;

    @Builder
    public ChatMessageResponse(String messageId, Long senderMemberId, String content, LocalDateTime createdAt) {
        this.senderMemberId = senderMemberId;
        this.messageId = messageId;
        this.content = content;
        this.createdAt = createdAt;
    }

    public static ChatMessageResponse from(ChatMessage message) {
        return new ChatMessageResponse(
            message.getId().toHexString(),
            message.getMemberId(),
            message.getContent(),
            message.getCreatedAt()
        );
    }
}
