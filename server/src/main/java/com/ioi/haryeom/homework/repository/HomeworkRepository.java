package com.ioi.haryeom.homework.repository;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import java.util.List;
import java.util.Optional;
import javax.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeworkRepository extends JpaRepository<Homework, Long> {

    Page<Homework> findAllByTutoringAndIsDeletedFalse(Tutoring tutoring, Pageable pageable);

    long countByTutoringAndIsDeletedFalse(Tutoring tutoring);

    long countByTutoringAndStatusAndIsDeletedFalse(Tutoring tutoring, HomeworkStatus status);

    @Lock(LockModeType.OPTIMISTIC)
    Optional<Homework> findByIdAndIsDeletedFalse(Long id);
}
