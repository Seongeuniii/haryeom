package com.ioi.haryeom.textbook.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class RegisteredTextbookNotFoundException extends NotFoundException {

    private static final String MESSAGE = "등록된 학습 자료가 없습니다. 선생님 ID : %d";

    public RegisteredTextbookNotFoundException(Long teacherMemberId) {
        super(String.format(MESSAGE, teacherMemberId));
    }
}
