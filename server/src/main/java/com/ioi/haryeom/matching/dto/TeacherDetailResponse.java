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

    private Long teacherId;
    private String profileUrl;
    private String name;
    private String college;
    private Integer career;
    private Gender gender;
    private Integer salary;
    private List<SubjectResponse> subjects;
    private String introduce;

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

    public static TeacherDetailResponse fromTeacher(Teacher teacher, List<TeacherSubject> teacherSubjects) {
        List<SubjectResponse> subjects = teacherSubjects.stream()
            .map(ts -> new SubjectResponse(ts.getSubject().getId(), ts.getSubject().getName()))
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
