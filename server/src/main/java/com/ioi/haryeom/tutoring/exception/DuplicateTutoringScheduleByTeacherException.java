package com.ioi.haryeom.tutoring.exception;

import com.ioi.haryeom.advice.exception.ConflictException;
import java.time.LocalDate;
import java.time.LocalTime;

public class DuplicateTutoringScheduleByTeacherException extends ConflictException {

    private static final String MESSAGE = "선생님의 과외 일정과 겹치는 일정이 존재합니다.\n정보( %s %s 진행시간: %d분 )";

    public DuplicateTutoringScheduleByTeacherException(LocalDate scheduleDate, LocalTime startTime, int duration) {
        super(String.format(MESSAGE, scheduleDate, startTime, duration));
    }
}
