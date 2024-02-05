package com.ioi.haryeom.matching.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.matching.document.MatchingResult;
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


    private RespondToMatchingResponse(Long recipientMemberId, String teacherName, String studentName, Boolean isAccepted,
        SubjectResponse subjectResponse,
        Integer hourlyRate) {
        this.recipientMemberId = recipientMemberId;
        this.teacherName = teacherName;
        this.studentName = studentName;
        this.isAccepted = isAccepted;
        this.subject = subjectResponse;
        this.hourlyRate = hourlyRate;
    }

    public static RespondToMatchingResponse from(MatchingResult matchingResult) {
        return new RespondToMatchingResponse(
            matchingResult.getRecipientMemberId(),
            matchingResult.getTeacherName(),
            matchingResult.getStudentName(),
            matchingResult.getIsAccepted(),
            matchingResult.getSubject(),
            matchingResult.getHourlyRate()
        );
    }


}
