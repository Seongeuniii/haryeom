package com.ioi.haryeom.matching.exception;

import com.ioi.haryeom.advice.exception.ConflictException;

public class DuplicateMatchingException extends ConflictException {

    private static final String MESSAGE = "채팅방에 매칭 요청이 이미 존재합니다. 채팅방 ID: %d";

    public DuplicateMatchingException(Long chatRoomId) {
        super(String.format(MESSAGE, chatRoomId));
    }
}
