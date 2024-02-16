package com.ioi.haryeom.homework.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class HomeNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 숙제 ID 입니다. 숙제 ID: %d";

    public HomeNotFoundException(Long homeworkId) {
        super(String.format(MESSAGE, homeworkId));
    }
}
