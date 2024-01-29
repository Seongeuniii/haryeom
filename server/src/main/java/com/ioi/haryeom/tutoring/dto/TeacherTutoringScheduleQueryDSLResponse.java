package com.ioi.haryeom.tutoring.dto;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;

@Getter
public class TeacherTutoringScheduleQueryDSLResponse {

    private Long tutoringScheduleId;

    private Long tutoringId;
    private Long studentMemberId;
    private String studentName;
    private String studentProfileUrl;

    private LocalDate scheduleDate;
    private LocalTime startTime;
    private Integer duration;
    private String title;

    @QueryProjection
    public TeacherTutoringScheduleQueryDSLResponse(Long tutoringScheduleId, Long tutoringId,
        Long studentMemberId, String studentName, String studentProfileUrl, LocalDate scheduleDate,
        LocalTime startTime, Integer duration, String title) {
        this.tutoringScheduleId = tutoringScheduleId;
        this.tutoringId = tutoringId;
        this.studentMemberId = studentMemberId;
        this.studentName = studentName;
        this.studentProfileUrl = studentProfileUrl;
        this.scheduleDate = scheduleDate;
        this.startTime = startTime;
        this.duration = duration;
        this.title = title;
    }
}
