package com.ioi.haryeom.matching.exception;

import com.ioi.haryeom.advice.exception.ConflictException;

public class DuplicateTutoringException extends ConflictException {

    private static final String MESSAGE = "해당 과목의 과외가 이미 존재합니다. 과목 ID :%d";
    public DuplicateTutoringException(Long subjectId) {
        super(String.format(MESSAGE, subjectId));
    }
}
