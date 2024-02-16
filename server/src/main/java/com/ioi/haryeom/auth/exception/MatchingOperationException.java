package com.ioi.haryeom.auth.exception;

public class MatchingOperationException extends RuntimeException {

    public MatchingOperationException(String message) {
        super(message);
    }

    public MatchingOperationException(String message, Throwable cause) {
        super(message, cause);
    }

}