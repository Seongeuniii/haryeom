package com.ioi.haryeom.member.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class SubjectNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 과목 ID 입니다. 과목 ID: %d";

    public SubjectNotFoundException(Long subjectId) {
        super(String.format(MESSAGE, subjectId));
    }
}
