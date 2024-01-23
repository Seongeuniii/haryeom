package com.ioi.haryeom.member.repository;

import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Teacher;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByMember(Member teacherMember);
}
