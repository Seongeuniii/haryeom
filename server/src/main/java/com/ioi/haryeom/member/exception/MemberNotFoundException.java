package com.ioi.haryeom.member.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class MemberNotFoundException extends NotFoundException {

    public MemberNotFoundException(String message) {
        super(message);
    }
}
