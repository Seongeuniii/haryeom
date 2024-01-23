package com.ioi.haryeom.tutoring.repository;

import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutoringRepository extends JpaRepository<Tutoring, Long> {

    List<Tutoring> findAllByTeacherId(Long teacherMemberId);
}
