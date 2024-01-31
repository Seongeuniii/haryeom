package com.ioi.haryeom.aws.exception;

public class S3UploadException extends RuntimeException {
    private static final String MESSAGE = "파일 업로드에 실패하였습니다.";

    public S3UploadException() {
        super(MESSAGE);
    }
}
