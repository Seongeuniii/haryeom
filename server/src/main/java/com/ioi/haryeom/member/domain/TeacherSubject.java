package com.ioi.haryeom.member.domain;

import com.ioi.haryeom.common.domain.Subject;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TeacherSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "teacher_member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Teacher teacher;

    @JoinColumn(name = "subject_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Subject subject;
}
