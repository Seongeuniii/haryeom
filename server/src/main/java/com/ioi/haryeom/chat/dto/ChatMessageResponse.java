package com.ioi.haryeom.chat.dto;

import com.ioi.haryeom.chat.domain.ChatMessage;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ChatMessageResponse {

    private final Long messageId;
    private final Long senderMemberId;
    private final String content;
    private final LocalDateTime createdAt;

    @Builder
    public ChatMessageResponse(Long senderMemberId, Long messageId, String content, LocalDateTime createdAt) {
        this.senderMemberId = senderMemberId;
        this.messageId = messageId;
        this.content = content;
        this.createdAt = createdAt;
    }

    public static ChatMessageResponse from(ChatMessage message) {
        return new ChatMessageResponse(
            message.getSenderMember().getId(),
            message.getId(),
            message.getMessageContent(),
            message.getCreatedAt()
        );
    }
}
