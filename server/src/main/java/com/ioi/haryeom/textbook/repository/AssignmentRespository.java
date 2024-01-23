package com.ioi.haryeom.textbook.repository;

import com.ioi.haryeom.textbook.domain.Assignment;
import com.ioi.haryeom.textbook.domain.Textbook;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRespository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByTutoringId(Long tutoringId);

    List<Assignment> findByTextbook(Textbook textbook);

}
