package com.ioi.haryeom.matching.document;

import com.ioi.haryeom.chat.domain.ChatRoom;
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
public class MatchingResult {

    @Id //_id
    private ObjectId id;
    private Long chatRoomId;
    private Long recipientMemberId;
    private Boolean isAccepted;
    private String teacherName;
    private String studentName;
    private SubjectResponse subject;
    private Integer hourlyRate;

    @Builder
    public MatchingResult(Matching matching, ChatRoom chatRoom, Member member, Boolean isAccepted) {
        this.chatRoomId = chatRoom.getId();
        this.recipientMemberId = chatRoom.getOppositeMember(member).getId();
        this.isAccepted = isAccepted;
        this.teacherName = chatRoom.getTeacherMember().getName();
        this.studentName = chatRoom.getStudentMember().getName();
        this.subject = matching.getSubject();
        this.hourlyRate = matching.getHourlyRate();
    }
}