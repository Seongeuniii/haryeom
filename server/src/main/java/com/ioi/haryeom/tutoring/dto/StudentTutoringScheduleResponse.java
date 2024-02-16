package com.ioi.haryeom.tutoring.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import java.time.LocalTime;
import lombok.Getter;

@Getter
public class StudentTutoringScheduleResponse {

    private Long tutoringScheduleId;

    private Long tutoringId;
    private Long teacherMemberId;
    private String teacherName;
    private String teacherProfileUrl;
    private SubjectResponse subject;

    private LocalTime startTime;
    private Integer duration;
    private String title;

    public StudentTutoringScheduleResponse(TutoringSchedule tutoringSchedule) {
        this.tutoringScheduleId = tutoringSchedule.getId();
        this.tutoringId = tutoringSchedule.getTutoring().getId();
        this.teacherMemberId = tutoringSchedule.getTutoring().getTeacher().getId();
        this.teacherName = tutoringSchedule.getTutoring().getTeacher().getName();
        this.teacherProfileUrl = tutoringSchedule.getTutoring().getTeacher().getProfileUrl();
        this.subject = new SubjectResponse(tutoringSchedule.getTutoring().getSubject());
        this.startTime = tutoringSchedule.getStartTime();
        this.duration = tutoringSchedule.getDuration();
        this.title = tutoringSchedule.getTitle();
    }

    public StudentTutoringScheduleResponse(StudentTutoringScheduleQueryDSLResponse studentTutoringScheduleQueryDSL) {
        this.tutoringScheduleId = studentTutoringScheduleQueryDSL.getTutoringScheduleId();
        this.tutoringId = studentTutoringScheduleQueryDSL.getTutoringId();
        this.teacherMemberId = studentTutoringScheduleQueryDSL.getTeacherMemberId();
        this.teacherName = studentTutoringScheduleQueryDSL.getTeacherName();
        this.teacherProfileUrl = studentTutoringScheduleQueryDSL.getTeacherProfileUrl();
        this.subject = new SubjectResponse(studentTutoringScheduleQueryDSL.getSubject());
        this.startTime = studentTutoringScheduleQueryDSL.getStartTime();
        this.duration = studentTutoringScheduleQueryDSL.getDuration();
        this.title = studentTutoringScheduleQueryDSL.getTitle();
    }
}
