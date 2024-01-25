package com.ioi.haryeom.matching.dto;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.member.domain.Member;
import lombok.Getter;

@Getter
public class RespondToMatchingResponse {

    private Long receiveMemberId;
    private Boolean isAccepted;
    private String teacherName;
    private String studentName;
    private String subjectName;


    private RespondToMatchingResponse(Long receiveMemberId, String teacherName, String studentName, String subjectName,
        Boolean isAccepted) {
        this.receiveMemberId = receiveMemberId;
        this.teacherName = teacherName;
        this.studentName = studentName;
        this.subjectName = subjectName;
        this.isAccepted = isAccepted;
    }

    public static RespondToMatchingResponse of(ChatRoom chatRoom, Member member, Subject subject, Boolean isAccepted) {
        return new RespondToMatchingResponse(
            chatRoom.getOppositeMember(member).getId(),
            chatRoom.getTeacherMember().getName(),
            chatRoom.getStudentMember().getName(),
            subject.getName(),
            isAccepted
        );
    }


}
