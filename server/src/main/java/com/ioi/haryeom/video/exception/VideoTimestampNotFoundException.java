package com.ioi.haryeom.video.exception;

import com.ioi.haryeom.advice.exception.NotFoundException;

public class VideoTimestampNotFoundException extends NotFoundException {

    private static final String MESSAGE = "요청한 타임스탬프가 존재하지 않습니다. 타임스탬프id: %d";
    public VideoTimestampNotFoundException(Long videoTimestampId) {
        super(String.format(MESSAGE, videoTimestampId));
    }
}
