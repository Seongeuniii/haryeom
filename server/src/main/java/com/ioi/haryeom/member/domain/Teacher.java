package com.ioi.haryeom.member.domain;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.member.domain.type.Gender;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Teacher extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    private List<TeacherSubject> teacherSubjects = new ArrayList<>();

    private Boolean profileStatus;

    private String college;

    private String major;

    private String collegeEmail;

    @Enumerated(EnumType.STRING)
    private Gender gender = Gender.NONE;

    private Integer salary;

    private Integer career;

    private String introduce;

    @Builder
    public Teacher(Long id, Member member, Boolean profileStatus, String college, String major,
        String collegeEmail, Gender gender, Integer salary, Integer career, String introduce) {
        this.id = id;
        this.member = member;
        this.profileStatus = profileStatus;
        this.college = college;
        this.major = major;
        this.collegeEmail = collegeEmail;
        this.gender = gender;
        this.salary = salary;
        this.career = career;
        this.introduce = introduce;
    }
}
