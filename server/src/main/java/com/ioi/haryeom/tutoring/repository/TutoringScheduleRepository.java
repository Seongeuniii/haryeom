package com.ioi.haryeom.tutoring.repository;

import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutoringScheduleRepository extends JpaRepository<TutoringSchedule, Long>, TutoringScheduleRepositoryCustom {

}