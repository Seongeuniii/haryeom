package com.ioi.haryeom.homework.repository;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeworkRepository extends JpaRepository<Homework, Long> {

    Page<Homework> findAllByTutoring(Tutoring tutoring, Pageable pageable);

    long countByTutoring(Tutoring tutoring);

    long countByTutoringAndStatus(Tutoring tutoring, HomeworkStatus status);

    List<Homework> findAllByTextbookIdAndStatus(Long textbookId, HomeworkStatus status);
}
