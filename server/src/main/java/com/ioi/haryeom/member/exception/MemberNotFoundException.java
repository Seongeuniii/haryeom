package com.ioi.haryeom.member.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class MemberNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 회원 ID 입니다. 회원 ID: %d";

    public MemberNotFoundException(Long memberId) {
        super(String.format(MESSAGE, memberId));
    }
}
