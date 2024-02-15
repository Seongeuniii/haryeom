package com.ioi.haryeom.setttlement.dto;

import java.time.LocalDate;
import lombok.Getter;

@Getter
public class ScheduleProgressResponse {

    private LocalDate scheduleDate;
    private String title;
    private Integer progressTimeInMinutes;

    public ScheduleProgressResponse(LocalDate scheduleDate, String title, Integer progressTimeInMinutes) {
        this.scheduleDate = scheduleDate;
        this.title = title;
        this.progressTimeInMinutes = progressTimeInMinutes;
    }

}
