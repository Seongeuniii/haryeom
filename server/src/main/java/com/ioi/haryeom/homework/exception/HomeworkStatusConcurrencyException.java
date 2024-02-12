package com.ioi.haryeom.homework.exception;

import com.ioi.haryeom.advice.exception.ConflictException;

public class HomeworkStatusConcurrencyException extends ConflictException {

    private static final String MESSAGE = "학생이 숙제를 이미 조회했기 때문에, 현재 작업을 진행할 수 없습니다. 최신 정보를 확인한 후 다시 시도해 주세요.";

    public HomeworkStatusConcurrencyException() {
        super(MESSAGE);
    }
}
