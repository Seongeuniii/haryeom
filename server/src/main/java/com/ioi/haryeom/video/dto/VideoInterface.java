package com.ioi.haryeom.video.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public interface VideoInterface {
    Long getId();
    String getTitle();
    LocalTime getStartTime();
    LocalTime getEndTime();
    LocalDate getScheduleDate();
}
