package com.ioi.haryeom.video.exception;

import com.ioi.haryeom.advice.exception.ForbiddenException;

public class UnauthorizedTeacherAccessException extends ForbiddenException {

    private static final String MESSAGE = "해당 과외에 접근할 수 있는 선생님이 아닙니다. 선생님 회원 ID : %d, 접근 회원 ID : %d";

    public UnauthorizedTeacherAccessException(Long teacherMemberId, Long memberId) {
        super(String.format(MESSAGE, teacherMemberId, memberId));

    }
}
