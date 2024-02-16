package com.ioi.haryeom.member.exception;

import com.ioi.haryeom.advice.exception.BadRequestException;

public class EmailCertifyException extends BadRequestException {

    public EmailCertifyException(String message) {
        super(message);
    }
}
