package com.ioi.haryeom.matching.exception;

import com.ioi.haryeom.advice.exception.ForbiddenException;

public class InvalidSubjectForTeacherException extends ForbiddenException {

    private static final String MESSAGE = "선생님이 가르칠 수 있는 과목이 아닙니다. 과목 ID : %d";

    public InvalidSubjectForTeacherException(Long subjectId) {
        super(String.format(MESSAGE, subjectId));
    }
}
