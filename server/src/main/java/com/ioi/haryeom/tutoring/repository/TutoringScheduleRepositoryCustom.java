package com.ioi.haryeom.tutoring.repository;

import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.dto.StudentTutoringScheduleQueryDSLResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringScheduleQueryDSLResponse;
import java.time.LocalDate;
import java.util.List;

public interface TutoringScheduleRepositoryCustom {

    List<LocalDate> getDateExistingScheduleByTeacherAndYearMonth(Long teacherMemberId, int year, int month);

    List<TeacherTutoringScheduleQueryDSLResponse> getTutoringScheduleListByTeacherAndYearMonth(Long teacherMemberId, List<LocalDate> scheduleDates);

    List<LocalDate> getDateExistingScheduleByStudentAndYearMonth(Long studentMemberId, int year, int month);

    List<StudentTutoringScheduleQueryDSLResponse> getTutoringScheduleListByStudentAndYearMonth(Long studentMemberId, List<LocalDate> scheduleDates);

}