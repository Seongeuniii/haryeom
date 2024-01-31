package com.ioi.haryeom.tutoring.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import java.time.LocalTime;
import lombok.Getter;

@Getter
public class TeacherTutoringScheduleResponse {

    private Long tutoringScheduleId;

    private Long tutoringId;
    private Long studentMemberId;
    private String studentName;
    private String studentProfileUrl;
    private SubjectResponse subject;

    private LocalTime startTime;
    private Integer duration;
    private String title;

    public TeacherTutoringScheduleResponse(TutoringSchedule tutoringSchedule) {
        this.tutoringScheduleId = tutoringSchedule.getId();
        this.tutoringId = tutoringSchedule.getTutoring().getId();
        this.studentMemberId = tutoringSchedule.getTutoring().getStudent().getId();
        this.studentName = tutoringSchedule.getTutoring().getStudent().getName();
        this.studentProfileUrl = tutoringSchedule.getTutoring().getStudent().getProfileUrl();
        this.subject = new SubjectResponse(tutoringSchedule.getTutoring().getSubject());
        this.startTime = tutoringSchedule.getStartTime();
        this.duration = tutoringSchedule.getDuration();
        this.title = tutoringSchedule.getTitle();
    }

    public TeacherTutoringScheduleResponse(TeacherTutoringScheduleQueryDSLResponse teacherTutoringScheduleQueryDSL) {
        this.tutoringScheduleId = teacherTutoringScheduleQueryDSL.getTutoringScheduleId();
        this.tutoringId = teacherTutoringScheduleQueryDSL.getTutoringId();
        this.studentMemberId = teacherTutoringScheduleQueryDSL.getStudentMemberId();
        this.studentName = teacherTutoringScheduleQueryDSL.getStudentName();
        this.studentProfileUrl = teacherTutoringScheduleQueryDSL.getStudentProfileUrl();
        this.subject = new SubjectResponse(teacherTutoringScheduleQueryDSL.getSubject());
        this.startTime = teacherTutoringScheduleQueryDSL.getStartTime();
        this.duration = teacherTutoringScheduleQueryDSL.getDuration();
        this.title = teacherTutoringScheduleQueryDSL.getTitle();
    }

}
