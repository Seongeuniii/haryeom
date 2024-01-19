package com.ioi.haryeom.homework.exception;

import com.ioi.haryeom.advice.exception.BadRequestException;

public class InvalidPageRangeException extends BadRequestException {

    private static final String MESSAGE = "숙제 페이지 범위가 학습 자료의 범위를 벗어납니다.";

    public InvalidPageRangeException() {
        super(MESSAGE);
    }
}
