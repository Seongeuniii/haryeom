package com.ioi.haryeom.member.exception;

public class TeacherNotFoundException extends RuntimeException {

    private static final String MESSAGE = "존재하지 않는 선생님 ID 입니다. 선생님 ID: %d";

    public TeacherNotFoundException(Long teacherId) {
        super(String.format(MESSAGE, teacherId));
    }
}
