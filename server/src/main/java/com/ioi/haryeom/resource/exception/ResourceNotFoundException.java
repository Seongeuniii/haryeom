package com.ioi.haryeom.resource.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class ResourceNotFoundException extends NotFoundException {

    private static final String MESSAGE = "존재하지 않는 학습자료 ID 입니다. 학습자료 ID: %d";

    public ResourceNotFoundException(Long resourceId) {
        super(String.format(MESSAGE, resourceId));
    }
}
