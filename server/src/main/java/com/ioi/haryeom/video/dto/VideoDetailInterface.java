package com.ioi.haryeom.video.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public interface VideoDetailInterface {
    Long getId();
    String getVideoURL();
    LocalTime getStartTime();
    LocalTime getEndTime();
}
