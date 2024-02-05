package com.ioi.haryeom.matching.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.matching.document.Matching;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class CreateMatchingResponse {

    private String matchingId;
    private Long recipientMemberId;
    private String senderName;
    private SubjectResponse subject;
    private Integer hourlyRate;

    public CreateMatchingResponse(String matchingId, Long recipientMemberId, String senderName,
        SubjectResponse subjectResponse, Integer hourlyRate) {
        this.matchingId = matchingId;
        this.recipientMemberId = recipientMemberId;
        this.senderName = senderName;
        this.subject = subjectResponse;
        this.hourlyRate = hourlyRate;
    }

    public static CreateMatchingResponse from(Matching matching) {
        return new CreateMatchingResponse(
            matching.getId().toHexString(),
            matching.getRecipientMemberId(),
            matching.getSenderName(),
            matching.getSubject(),
            matching.getHourlyRate()
        );
    }
}
