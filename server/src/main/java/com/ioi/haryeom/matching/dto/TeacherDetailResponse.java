package com.ioi.haryeom.matching.dto;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.domain.TeacherSubject;
import com.ioi.haryeom.member.domain.type.Gender;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class TeacherDetailResponse {

    private final Long teacherId;
    private final String profileUrl;
    private final String name;
    private final String college;
    private final Integer career;
    private final Gender gender;
    private final Integer salary;
    private final List<SubjectResponse> subjects;
    private final String introduce;

    public TeacherDetailResponse(Long teacherId, String profileUrl, String name, String college, Integer career,
        Gender gender, Integer salary, List<SubjectResponse> subjects, String introduce) {
        this.teacherId = teacherId;
        this.profileUrl = profileUrl;
        this.name = name;
        this.college = college;
        this.career = career;
        this.gender = gender;
        this.salary = salary;
        this.subjects = subjects;
        this.introduce = introduce;
    }

    public static TeacherDetailResponse from(Teacher teacher, List<TeacherSubject> teacherSubjects) {
        List<SubjectResponse> subjects = teacherSubjects.stream()
            .map(ts -> new SubjectResponse(ts.getSubject()))
            .collect(Collectors.toList());

        Member member = teacher.getMember();

        return new TeacherDetailResponse(
            teacher.getId(),
            member.getProfileUrl(),
            member.getName(),
            teacher.getCollege(),
            teacher.getCareer(),
            teacher.getGender(),
            teacher.getSalary(),
            subjects,
            teacher.getIntroduce()
        );
    }
}
