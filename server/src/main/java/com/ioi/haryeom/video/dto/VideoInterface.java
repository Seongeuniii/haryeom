package com.ioi.haryeom.video.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public interface VideoInterface {
    Long getVideoId();
    String getTitle();
    LocalTime getDuration();
    LocalDate getScheduleDate();
}
