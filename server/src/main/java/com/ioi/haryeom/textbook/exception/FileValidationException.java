package com.ioi.haryeom.textbook.exception;

public class FileValidationException extends RuntimeException {

    private static final String MESSAGE = "허용되지 않은 파일 확장자입니다. 허용된 확장자 : %d";

    public FileValidationException(String allowedExtensions) {
        super(String.format(MESSAGE, allowedExtensions));
    }
}
