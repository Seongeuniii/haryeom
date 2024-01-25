package com.ioi.haryeom.tutoring.dto;

import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.dto.SubjectResponse;
import lombok.Getter;

@Getter
public class TutoringResponse {

    private final Long tutoringId;
    private final SubjectResponse subject;


    public TutoringResponse(Long tutoringId, Subject subject) {
        this.tutoringId = tutoringId;
        this.subject = new SubjectResponse(subject);
    }
}
