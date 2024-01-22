package com.ioi.haryeom.tutoring.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;

@Getter
public class TeacherTutoringScheduleListResponse {

    private LocalDate scheduleDate;
    private Integer scheduleCount;

    private final List<TeacherTutoringScheduleResponse> schedules;

    public TeacherTutoringScheduleListResponse(LocalDate scheduleDate, Integer scheduleCount, List<TeacherTutoringScheduleResponse> schedules) {
        this.scheduleDate = scheduleDate;
        this.scheduleCount = scheduleCount;
        this.schedules = schedules;
    }
}
