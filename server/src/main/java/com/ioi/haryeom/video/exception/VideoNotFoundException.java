package com.ioi.haryeom.video.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class VideoNotFoundException extends NotFoundException {
    private static final String MESSAGE = "존재하지 않는 영상 id입니다. 영상 id : %d";

    public VideoNotFoundException(Long videoId) {
        super(String.format(MESSAGE,videoId));
    }
}

