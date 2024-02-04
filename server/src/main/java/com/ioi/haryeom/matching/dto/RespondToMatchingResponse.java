package com.ioi.haryeom.matching.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class RespondToMatchingResponse {

    private Long recipientMemberId;
    private Boolean isAccepted;
    private String teacherName;
    private String studentName;
    private SubjectResponse subject;
    private Integer hourlyRate;



    private RespondToMatchingResponse(Long recipientMemberId, String teacherName, String studentName, Boolean isAccepted, Subject subject,
        Integer hourlyRate) {
        this.recipientMemberId = recipientMemberId;
        this.teacherName = teacherName;
        this.studentName = studentName;
        this.isAccepted = isAccepted;
        this.subject = new SubjectResponse(subject);
        this.hourlyRate = hourlyRate;
    }

    public RespondToMatchingResponse(Long recipientMemberId, Boolean isAccepted, String teacherName, String studentName, SubjectResponse subject, Integer hourlyRate) {
        this.recipientMemberId = recipientMemberId;
        this.isAccepted = isAccepted;
        this.teacherName = teacherName;
        this.studentName = studentName;
        this.subject = subject;
        this.hourlyRate = hourlyRate;
    }

    public static RespondToMatchingResponse of(ChatRoom chatRoom, Member member, Subject subject, Boolean isAccepted, Integer hourlyRate) {
        return new RespondToMatchingResponse(
            chatRoom.getOppositeMember(member).getId(),
            chatRoom.getTeacherMember().getName(),
            chatRoom.getStudentMember().getName(),
            isAccepted,
            subject,
            hourlyRate
        );
    }


}
