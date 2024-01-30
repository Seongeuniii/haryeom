package com.ioi.haryeom.video.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class VideoRoomNotFoundException extends NotFoundException {

    private static final String MESSAGE = "화상 과외방에 입장할 수 없는 과외일정입니다. 과외일정 id: %d";
    public VideoRoomNotFoundException(Long tutoringScheduleId) {
        super(String.format(MESSAGE,tutoringScheduleId));
    }
}
