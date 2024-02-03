package com.ioi.haryeom.chat.document;

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
@Document   // chatMessage 객체를 몽고DB에 영속화시킨다.
public class ChatMessage {

    // 스프링 데이터 몽고DB가 도메인 객체를 몽고 DB 도큐먼트로 변화하거나 반대로 변환하는 과정을 알아서 처리한다.
    @Id //_id
    private ObjectId id;    // ObjectId는 도큐먼트를 위해 전역 고유 식별자를 제공

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
