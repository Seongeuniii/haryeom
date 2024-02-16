package com.ioi.haryeom.tutoring.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class MonthlyStudentTutoringScheduleListResponse {

    private final List<StudentTutoringScheduleListResponse> studentTutoringSchedules;

    public MonthlyStudentTutoringScheduleListResponse(List<StudentTutoringScheduleListResponse> studentTutoringSchedules) {
        this.studentTutoringSchedules = studentTutoringSchedules;
    }
}
