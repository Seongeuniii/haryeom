package com.ioi.haryeom.member.domain;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.member.domain.type.MemberStatus;
import com.ioi.haryeom.member.domain.type.Role;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "member")
    private Student student;

    @OneToOne(mappedBy = "member")
    private Teacher teacher;

    @Enumerated(EnumType.STRING)
    private Role role = Role.GUEST;

    @Enumerated(EnumType.STRING)
    private MemberStatus status = MemberStatus.ACTIVATED;

    private String oauthId;

    private String profileUrl;

    private String name;

    private String phone;

    @Builder
    public Member(Long id, Student student, Teacher teacher, Role role, MemberStatus status,
        String oauthId, String profileUrl, String name, String phone) {
        this.id = id;
        this.student = student;
        this.teacher = teacher;
        this.role = role;
        this.status = status;
        this.oauthId = oauthId;
        this.profileUrl = profileUrl;
        this.name = name;
        this.phone = phone;
    }

    public void createStudent(Student student, Role role, String profileUrl, String name,
        String phone) {
        this.student = student;
        this.role = role;
        this.profileUrl = profileUrl;
        this.name = name;
        this.phone = phone;
    }

    public void updateStudent(String profileUrl, String name,
        String phone) {
        this.profileUrl = profileUrl;
        this.name = name;
        this.phone = phone;
    }

    public void createTeacher(Teacher teacher, Role role, String profileUrl, String name,
        String phone) {
        this.teacher = teacher;
        this.role = role;
        this.profileUrl = profileUrl;
        this.name = name;
        this.phone = phone;
    }

    public void updateTeacher(String profileUrl, String name, String phone) {
        this.profileUrl = profileUrl;
        this.name = name;
        this.phone = phone;
    }

    public void delete() {
        this.status = MemberStatus.DELETED;
    }
}

