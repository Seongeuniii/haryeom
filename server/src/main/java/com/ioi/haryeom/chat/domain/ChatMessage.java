package com.ioi.haryeom.chat.domain;

import java.time.LocalDateTime;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document
public class ChatMessage {

    @Id
    private ObjectId id;

    private Long chatRoomId;
    private Long memberId;
    private String content;

    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public ChatMessage(Long chatRoomId, Long memberId, String content) {
        this.chatRoomId = chatRoomId;
        this.memberId = memberId;
        this.content = content;
    }
}
