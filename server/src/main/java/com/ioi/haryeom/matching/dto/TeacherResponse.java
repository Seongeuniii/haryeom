package com.ioi.haryeom.matching.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Teacher;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class TeacherResponse {

    private final Long teacherId;
    private final String profileUrl;
    private final String name;
    private final String college;
    private final Integer career;
    private final Integer salary;
    private final List<SubjectResponse> subjects;

    private TeacherResponse(Long teacherId, String profileUrl, String name, String college, Integer career,
        Integer salary, List<SubjectResponse> subjects) {
        this.teacherId = teacherId;
        this.profileUrl = profileUrl;
        this.name = name;
        this.college = college;
        this.career = career;
        this.salary = salary;
        this.subjects = subjects;
    }

    public static TeacherResponse from(Teacher teacher) {
        List<SubjectResponse> subjects = teacher.getTeacherSubjects().stream()
            .map(ts -> new SubjectResponse(ts.getSubject()))
            .collect(Collectors.toList());

        Member member = teacher.getMember();

        return new TeacherResponse(
            teacher.getId(),
            member.getProfileUrl(),
            member.getName(),
            teacher.getCollege(),
            teacher.getCareer(),
            teacher.getSalary(),
            subjects
        );
    }
}