package com.ioi.haryeom.matching.document;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.member.domain.Member;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document
public class Matching {

    // 스프링 데이터 몽고DB가 도메인 객체를 몽고 DB 도큐먼트로 변화하거나 반대로 변환하는 과정을 알아서 처리한다.
    @Id //_id
    private ObjectId id;
    private Long chatRoomId;
    private Long recipientMemberId;
    private String senderName;
    private SubjectResponse subject;
    private Integer hourlyRate;

    @Builder
    public Matching(ChatRoom chatRoom, Member member, Subject subject, Integer hourlyRate) {
        this.chatRoomId = chatRoom.getId();
        this.recipientMemberId = chatRoom.getOppositeMember(member).getId();
        this.senderName = member.getName();
        this.subject = new SubjectResponse(subject);
        this.hourlyRate = hourlyRate;
    }
}