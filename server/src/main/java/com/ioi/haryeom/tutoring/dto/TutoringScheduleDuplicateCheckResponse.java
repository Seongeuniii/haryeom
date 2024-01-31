package com.ioi.haryeom.tutoring.dto;

import lombok.Getter;

@Getter
public class TutoringScheduleDuplicateCheckResponse {

    private boolean duplicateCheckResult;

    public TutoringScheduleDuplicateCheckResponse(boolean duplicateCheckResult) {
        this.duplicateCheckResult = duplicateCheckResult;
    }
}
