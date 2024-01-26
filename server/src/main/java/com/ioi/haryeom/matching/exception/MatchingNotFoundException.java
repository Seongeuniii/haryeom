package com.ioi.haryeom.matching.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class MatchingNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 매칭 ID 입니다. 매칭 ID: %s";

    public MatchingNotFoundException(String matchingId) {
        super(String.format(MESSAGE, matchingId));
    }
}
