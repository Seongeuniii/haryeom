package com.ioi.haryeom.textbook.repository;

import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.textbook.domain.Textbook;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextbookRepository extends JpaRepository<Textbook, Long> {

    List<Textbook> findAllByTeacherMemberAndIsDeletedFalse(Member teacherMember);

    Optional<Textbook> findByIdAndIsDeletedFalse(Long textbookId);
}
