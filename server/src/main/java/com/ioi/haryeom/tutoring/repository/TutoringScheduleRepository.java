package com.ioi.haryeom.tutoring.repository;

import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TutoringScheduleRepository extends JpaRepository<TutoringSchedule, Long>, TutoringScheduleRepositoryCustom {
    List<TutoringSchedule> findAllByScheduleDate(LocalDate scheduleDate);

    @Query(value = "SELECT * FROM tutoring_schedule ts " +
        "LEFT JOIN tutoring t ON ts.tutoring_id = t.id " +
        "LEFT JOIN member m ON t.teacher_member_id = m.id " +
        "WHERE m.id = :teacherMemberId " +
        "AND DATE_ADD(STR_TO_DATE(CONCAT(ts.schedule_date, ' ', ts.start_time), '%Y-%m-%d %H:%i:%s'), INTERVAL ts.duration MINUTE) <= :endDateTime " +
        "AND STR_TO_DATE(CONCAT(ts.schedule_date, ' ', ts.start_time), '%Y-%m-%d %H:%i:%s') >= :startDateTime",
        nativeQuery = true)
    List<TutoringSchedule> findTutoringSchedulesByTeacherAndDateRange(
        @Param("teacherMemberId") Long teacherMemberId,
        @Param("startDateTime") LocalDateTime startDateTime,
        @Param("endDateTime") LocalDateTime endDateTime);

    @Query(value = "SELECT * FROM tutoring_schedule ts " +
        "LEFT JOIN tutoring t ON ts.tutoring_id = t.id " +
        "LEFT JOIN member m ON t.student_member_id = m.id " +
        "WHERE m.id = :studentMemberId " +
        "AND DATE_ADD(STR_TO_DATE(CONCAT(ts.schedule_date, ' ', ts.start_time), '%Y-%m-%d %H:%i:%s'), INTERVAL ts.duration MINUTE) <= :endDateTime " +
        "AND STR_TO_DATE(CONCAT(ts.schedule_date, ' ', ts.start_time), '%Y-%m-%d %H:%i:%s') >= :startDateTime",
        nativeQuery = true)
    List<TutoringSchedule> findTutoringSchedulesByStudentAndDateRange(
        @Param("studentMemberId") Long studentMemberId,
        @Param("startDateTime") LocalDateTime startDateTime,
        @Param("endDateTime") LocalDateTime endDateTime);
}