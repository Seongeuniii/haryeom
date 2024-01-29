package com.ioi.haryeom.homework.exception;

import com.ioi.haryeom.advice.exception.ForbiddenException;

public class HomeworkAlreadySubmittedException extends ForbiddenException {

    private static final String MESSAGE = "이미 제출한 숙제입니다.";

    public HomeworkAlreadySubmittedException() {
        super(MESSAGE);
    }
}
