package com.ioi.haryeom.matching.dto;

import com.ioi.haryeom.chat.domain.ChatRoom;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateMatchingResponse {

    private Long receiveMemberId;
    private String senderName;
    private String subjectName;
    private Integer hourlyRate;

    private CreateMatchingResponse(Long receiveMemberId, String senderName, String subjectName, Integer hourlyRate) {
        this.receiveMemberId = receiveMemberId;
        this.senderName = senderName;
        this.subjectName = subjectName;
        this.hourlyRate = hourlyRate;
    }

    public static CreateMatchingResponse of(ChatRoom chatRoom, String subjectName, Integer hourlyRate) {
        return new CreateMatchingResponse(
            chatRoom.getTeacherMember().getId(),
            chatRoom.getStudentMember().getName(),
            subjectName,
            hourlyRate
        );
    }
}
