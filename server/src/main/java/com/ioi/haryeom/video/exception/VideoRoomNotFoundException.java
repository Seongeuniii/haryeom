package com.ioi.haryeom.video.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class VideoRoomNotFoundException extends NotFoundException {

    private static final String MESSAGE = "예정된 과외일정이 오늘이 아닙니다. 과외일정id: %d";
    public VideoRoomNotFoundException(Long tutoringScheduleId) {
        super(String.format(MESSAGE,tutoringScheduleId));
    }
}
