package com.ioi.haryeom.video.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class VideoTutoringNotFoundException extends NotFoundException {

    private static final String MESSAGE = "해당하는 과외 일정에 맞는 영상이 존재하지 않습니다. 과외일정id: %d";
    public VideoTutoringNotFoundException(Long tutoringScheduleId) {
        super(String.format(MESSAGE, tutoringScheduleId));
    }
}
