package com.ioi.haryeom.tutoring.repository;

import com.ioi.haryeom.common.domain.QSubject;
import com.ioi.haryeom.member.domain.QMember;
import com.ioi.haryeom.tutoring.domain.QTutoring;
import com.ioi.haryeom.tutoring.domain.QTutoringSchedule;
import com.ioi.haryeom.tutoring.dto.QStudentTutoringScheduleQueryDSLResponse;
import com.ioi.haryeom.tutoring.dto.QTeacherTutoringScheduleQueryDSLResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringScheduleQueryDSLResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringScheduleQueryDSLResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TutoringScheduleRepositoryCustomImpl implements TutoringScheduleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<LocalDate> getDateExistingScheduleByTeacherAndYearMonth(Long teacherMemberId, int year, int month) {
        QTutoringSchedule tutoringSchedule = QTutoringSchedule.tutoringSchedule;

        return queryFactory
            .select(tutoringSchedule.scheduleDate)
            .from(tutoringSchedule)
            .where(tutoringSchedule.tutoring.teacher.id.eq(teacherMemberId), tutoringSchedule.scheduleDate.year().eq(year), tutoringSchedule.scheduleDate.month().eq(month))
            .groupBy(tutoringSchedule.scheduleDate)
            .orderBy(tutoringSchedule.scheduleDate.asc())
            .fetch();
    }

    @Override
    public List<TeacherTutoringScheduleQueryDSLResponse> getTutoringScheduleListByTeacherAndYearMonth(Long teacherMemberId, List<LocalDate> scheduleDates) {
        QTutoringSchedule tutoringSchedule = QTutoringSchedule.tutoringSchedule;
        QTutoring tutoring = QTutoring.tutoring;
        QSubject subject = QSubject.subject;
        QMember member = QMember.member;

        return queryFactory
            .select(new QTeacherTutoringScheduleQueryDSLResponse(tutoringSchedule.id, tutoring.id,
                member.id, member.name, member.profileUrl, subject, tutoringSchedule.scheduleDate,
                tutoringSchedule.startTime, tutoringSchedule.duration, tutoringSchedule.title))
            .from(tutoringSchedule)
            .join(tutoringSchedule.tutoring, tutoring)
            .join(tutoring.subject, subject)
            .join(tutoring.student, member)
            .where(tutoringSchedule.tutoring.teacher.id.eq(teacherMemberId), tutoringSchedule.scheduleDate.in(scheduleDates))
            .orderBy(tutoringSchedule.scheduleDate.asc(), tutoringSchedule.startTime.asc())
            .fetch();
    }

    @Override
    public List<LocalDate> getDateExistingScheduleByStudentAndYearMonth(Long studentMemberId, int year, int month) {
        QTutoringSchedule tutoringSchedule = QTutoringSchedule.tutoringSchedule;

        return queryFactory
            .select(tutoringSchedule.scheduleDate)
            .from(tutoringSchedule)
            .where(tutoringSchedule.tutoring.student.id.eq(studentMemberId), tutoringSchedule.scheduleDate.year().eq(year), tutoringSchedule.scheduleDate.month().eq(month))
            .groupBy(tutoringSchedule.scheduleDate)
            .orderBy(tutoringSchedule.scheduleDate.asc())
            .fetch();
    }

    @Override
    public List<StudentTutoringScheduleQueryDSLResponse> getTutoringScheduleListByStudentAndYearMonth(Long studentMemberId, List<LocalDate> scheduleDates) {
        QTutoringSchedule tutoringSchedule = QTutoringSchedule.tutoringSchedule;
        QTutoring tutoring = QTutoring.tutoring;
        QSubject subject = QSubject.subject;
        QMember member = QMember.member;

        return queryFactory
            .select(new QStudentTutoringScheduleQueryDSLResponse(tutoringSchedule.id, tutoring.id,
                member.id, member.name, member.profileUrl, subject, tutoringSchedule.scheduleDate,
                tutoringSchedule.startTime, tutoringSchedule.duration, tutoringSchedule.title))
            .from(tutoringSchedule)
            .join(tutoringSchedule.tutoring, tutoring)
            .join(tutoring.subject, subject)
            .join(tutoring.teacher, member)
            .where(tutoringSchedule.tutoring.student.id.eq(studentMemberId), tutoringSchedule.scheduleDate.in(scheduleDates))
            .orderBy(tutoringSchedule.scheduleDate.asc(), tutoringSchedule.startTime.asc())
            .fetch();
    }
}