package com.ioi.haryeom.common.dto;

import lombok.Getter;

@Getter
public class SubjectResponse {

    private Long subjectId;
    private String subjectName;

    public SubjectResponse(Long subjectId, String subjectName) {
        this.subjectId = subjectId;
        this.subjectName = subjectName;
    }
}