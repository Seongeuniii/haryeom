package com.ioi.haryeom.video.exception;

import com.ioi.haryeom.advice.exception.BadRequestException;

public class VideoExistException extends BadRequestException {
    private static final String MESSAGE = "이미 녹화 영상이 존재하는 수업입니다. 수업일정 id : %d";

    public VideoExistException(Long tutoringScheduleId) {
        super(String.format(MESSAGE,tutoringScheduleId));
    }
}
