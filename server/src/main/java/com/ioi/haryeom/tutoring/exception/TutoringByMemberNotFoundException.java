package com.ioi.haryeom.tutoring.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class TutoringByMemberNotFoundException extends NotFoundException {
    private static final String MESSAGE = "해당 선생님(ID : %d)과 학생(ID : %d) 으로 진행 중인 과외가 없습니다.";

    public TutoringByMemberNotFoundException(Long teacherMemberId, Long studentMemberId) {
        super(String.format(MESSAGE, teacherMemberId, studentMemberId));
    }
}
