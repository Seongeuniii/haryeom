package com.ioi.haryeom.member.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "member_id", referencedColumnName = "id")
    @OneToOne(fetch = FetchType.LAZY)
    private Member member;

    private String grade;

    private String school;

    @Builder
    public Student(Long id, Member member, String grade, String school) {
        this.id = id;
        this.member = member;
        this.grade = grade;
        this.school = school;
    }
}
