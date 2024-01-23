package com.ioi.haryeom.video.dto;

import java.time.LocalTime;

public interface VideoTimestampInterface {
    Long getId();
    LocalTime getStampTime();
    String getContent();
}
