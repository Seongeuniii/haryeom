package com.ioi.haryeom.tutoring.dto;

import com.ioi.haryeom.common.domain.Subject;
import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;

@Getter
public class StudentTutoringScheduleQueryDSLResponse {

    private Long tutoringScheduleId;

    private Long tutoringId;
    private Long teacherMemberId;
    private String teacherName;
    private String teacherProfileUrl;
    private Subject subject;

    private LocalDate scheduleDate;
    private LocalTime startTime;
    private Integer duration;
    private String title;

    @QueryProjection
    public StudentTutoringScheduleQueryDSLResponse(Long tutoringScheduleId, Long tutoringId,
        Long teacherMemberId, String teacherName, String teacherProfileUrl, Subject subject, LocalDate scheduleDate, LocalTime startTime,
        Integer duration, String title) {
        this.tutoringScheduleId = tutoringScheduleId;
        this.tutoringId = tutoringId;
        this.teacherMemberId = teacherMemberId;
        this.teacherName = teacherName;
        this.teacherProfileUrl = teacherProfileUrl;
        this.subject = subject;
        this.scheduleDate = scheduleDate;
        this.startTime = startTime;
        this.duration = duration;
        this.title = title;
    }
}
