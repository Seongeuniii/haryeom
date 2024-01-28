package com.ioi.haryeom.tutoring.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class MonthlyTeacherTutoringScheduleListResponse {

    private final List<TeacherTutoringScheduleListResponse> teacherTutoringSchedules;

    public MonthlyTeacherTutoringScheduleListResponse(List<TeacherTutoringScheduleListResponse> teacherTutoringSchedules) {
        this.teacherTutoringSchedules = teacherTutoringSchedules;
    }
}
