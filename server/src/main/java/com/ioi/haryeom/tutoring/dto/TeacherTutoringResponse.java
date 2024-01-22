package com.ioi.haryeom.tutoring.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import lombok.Getter;

@Getter
public class TeacherTutoringResponse {

    private Long tutoringId;

    private Long studentMemberId;
    private String studentName;
    private String studentProfileUrl;
    private String studentSchool;
    private String studentGrade;

    private SubjectResponse subject;

    public TeacherTutoringResponse(Tutoring tutoring) {
        this.tutoringId = tutoring.getId();
        this.studentMemberId = tutoring.getStudent().getId();
        this.studentName = tutoring.getStudent().getName();
        this.studentProfileUrl = tutoring.getStudent().getProfileUrl();
        this.studentSchool = tutoring.getStudent().getStudent().getSchool();
        this.studentGrade = tutoring.getStudent().getStudent().getGrade();
        this.subject = new SubjectResponse(tutoring.getSubject());
    }
}