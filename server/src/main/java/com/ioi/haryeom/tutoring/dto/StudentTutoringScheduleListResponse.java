package com.ioi.haryeom.tutoring.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.Getter;

@Getter
public class StudentTutoringScheduleListResponse {

    private LocalDate scheduleDate;
    private Integer scheduleCount;

    private final List<StudentTutoringScheduleResponse> schedules;

    public StudentTutoringScheduleListResponse(LocalDate scheduleDate, Integer scheduleCount, List<StudentTutoringScheduleResponse> schedules) {
        this.scheduleDate = scheduleDate;
        this.scheduleCount = scheduleCount;
        this.schedules = schedules;
    }
}
