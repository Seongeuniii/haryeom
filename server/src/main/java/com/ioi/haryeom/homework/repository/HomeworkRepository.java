package com.ioi.haryeom.homework.repository;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeworkRepository extends JpaRepository<Homework, Long> {

    Page<Homework> findAllByTutoringId(Long tutoringId, Pageable pageable);
    long countByTutoringId(Long tutoringId);

    long countByTutoringIdAndStatus(Long tutoringId, HomeworkStatus status);
}
