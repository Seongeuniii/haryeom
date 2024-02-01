package com.ioi.haryeom.tutoring.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import com.ioi.haryeom.tutoring.dto.MonthlyStudentTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.MonthlyTeacherTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringScheduleQueryDSLResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringScheduleResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringScheduleQueryDSLResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringScheduleResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleDuplicateCheckRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleDuplicateCheckResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleIdsResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleListRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleResponse;
import com.ioi.haryeom.tutoring.exception.DuplicateTutoringScheduleByStudentException;
import com.ioi.haryeom.tutoring.exception.DuplicateTutoringScheduleByTeacherException;
import com.ioi.haryeom.tutoring.exception.ScheduleOnlyInProgerssTutoringException;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.exception.TutoringScheduleNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class TutoringService {

    private final TutoringRepository tutoringRepository;

    private final TutoringScheduleRepository tutoringScheduleRepository;

    private final MemberRepository memberRepository;

    public TeacherTutoringListResponse getTeacherTutoringList(Long teacherMemberId) {
        Member teacher = memberRepository.findById(teacherMemberId)
            .orElseThrow(() -> new MemberNotFoundException(teacherMemberId));

        List<Tutoring> teacherTutoringList = tutoringRepository.findAllByTeacherAndStatus(teacher, TutoringStatus.IN_PROGRESS);

        List<TeacherTutoringResponse> teacherTutoringResponses = teacherTutoringList
            .stream()
            .map(TeacherTutoringResponse::new)
            .collect(Collectors.toList());

        return new TeacherTutoringListResponse(teacherTutoringResponses);
    }

    public StudentTutoringListResponse getStudentTutoringList(Long studentMemberId) {
        Member student = memberRepository.findById(studentMemberId)
            .orElseThrow(() -> new MemberNotFoundException(studentMemberId));

        List<Tutoring> studentTutoringList = tutoringRepository.findAllByStudentAndStatus(student, TutoringStatus.IN_PROGRESS);

        List<StudentTutoringResponse> studentTutoringResponses = studentTutoringList
            .stream()
            .map(StudentTutoringResponse::new)
            .collect(Collectors.toList());

        return new StudentTutoringListResponse(studentTutoringResponses);
    }


    @Transactional
    public TutoringScheduleIdsResponse createTutoringSchedules(Long teacherMemberId, TutoringScheduleListRequest request) {
        Tutoring tutoring = tutoringRepository.findByIdAndStatus(request.getTutoringId(), TutoringStatus.IN_PROGRESS)
            .orElseThrow(() ->  new TutoringNotFoundException(request.getTutoringId()));
        if(!tutoring.getTeacher().getId().equals(teacherMemberId)) {
            throw new AuthorizationException(teacherMemberId);
        }

        if(!tutoring.getStatus().equals(TutoringStatus.IN_PROGRESS)) {
            throw new ScheduleOnlyInProgerssTutoringException();
        }

        List<Long> savedScheduleIds = new ArrayList<>();
        for(TutoringScheduleRequest scheduleRequest : request.getSchedules()) {
//            List<TutoringSchedule> duplicateScheduleByTeacher = getDuplicateScheduleByTeacher(teacherMemberId, scheduleRequest.getScheduleDate(), scheduleRequest.getStartTime(), scheduleRequest.getDuration());
//            if(!duplicateScheduleByTeacher.isEmpty()) {
//                throw new DuplicateTutoringScheduleByTeacherException(scheduleRequest.getScheduleDate(), scheduleRequest.getStartTime(), scheduleRequest.getDuration());
//            }
//            List<TutoringSchedule> duplicateScheduleByStudent = getDuplicateScheduleByStudent(tutoring.getStudent().getId(), scheduleRequest.getScheduleDate(), scheduleRequest.getStartTime(), scheduleRequest.getDuration());
//            if(!duplicateScheduleByStudent.isEmpty()) {
//                throw new DuplicateTutoringScheduleByStudentException(scheduleRequest.getScheduleDate(), scheduleRequest.getStartTime(), scheduleRequest.getDuration());
//            }

            TutoringSchedule schedule = TutoringSchedule.builder()
                .tutoring(tutoring)
                .scheduleDate(scheduleRequest.getScheduleDate())
                .startTime(scheduleRequest.getStartTime())
                .duration(scheduleRequest.getDuration())
                .title(scheduleRequest.getTitle())
                .build();

            TutoringSchedule savedSchedule = tutoringScheduleRepository.save(schedule);

            savedScheduleIds.add(savedSchedule.getId());
        }

        return new TutoringScheduleIdsResponse(savedScheduleIds);
    }

    public TutoringScheduleResponse getTutoringSchedule(Long teacherMemberId, Long tutoringScheduleId) {
        TutoringSchedule tutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId)
            .orElseThrow(() -> new TutoringScheduleNotFoundException(tutoringScheduleId));
        if(!tutoringSchedule.getTutoring().getTeacher().getId().equals(teacherMemberId)) {
            throw new AuthorizationException(teacherMemberId);
        }

        return new TutoringScheduleResponse(tutoringSchedule);
    }

    @Transactional
    public void updateTutoringSchedule(Long teacherMemberId, Long tutoringScheduleId, TutoringScheduleRequest request) {
        TutoringSchedule tutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId)
            .orElseThrow(() -> new TutoringScheduleNotFoundException(tutoringScheduleId));
        if(!tutoringSchedule.getTutoring().getTeacher().getId().equals(teacherMemberId)) {
            throw new AuthorizationException(teacherMemberId);
        }

        if(!tutoringSchedule.getTutoring().getStatus().equals(TutoringStatus.IN_PROGRESS)) {
            throw new ScheduleOnlyInProgerssTutoringException();
        }

//        List<TutoringSchedule> duplicateScheduleByTeacher = getDuplicateScheduleByTeacher(teacherMemberId, request.getScheduleDate(), request.getStartTime(), request.getDuration())
//            .stream()
//            .filter(sch -> !sch.getId().equals(tutoringScheduleId))
//            .collect(Collectors.toList());
//        if(!duplicateScheduleByTeacher.isEmpty()) {
//            throw new DuplicateTutoringScheduleByTeacherException(request.getScheduleDate(), request.getStartTime(), request.getDuration());
//        }
//        List<TutoringSchedule> duplicateScheduleByStudent = getDuplicateScheduleByStudent(tutoringSchedule.getTutoring().getStudent().getId(), request.getScheduleDate(), request.getStartTime(), request.getDuration())
//            .stream()
//            .filter(sch -> !sch.getId().equals(tutoringScheduleId))
//            .collect(Collectors.toList());
//        if(!duplicateScheduleByStudent.isEmpty()) {
//            throw new DuplicateTutoringScheduleByStudentException(request.getScheduleDate(), request.getStartTime(), request.getDuration());
//        }

        tutoringSchedule.update(tutoringSchedule.getTutoring(), request.getScheduleDate(), request.getStartTime(), request.getDuration(), request.getTitle());
    }

    @Transactional
    public void deleteTutoringSchedule(Long teacherMemberId, Long tutoringScheduleId) {
        TutoringSchedule tutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId)
            .orElseThrow(() -> new TutoringScheduleNotFoundException(tutoringScheduleId));
        if(!tutoringSchedule.getTutoring().getTeacher().getId().equals(teacherMemberId)) {
            throw new AuthorizationException(teacherMemberId);
        }

        tutoringScheduleRepository.delete(tutoringSchedule);
    }

    public MonthlyTeacherTutoringScheduleListResponse getMonthlyTeacherTutoringScheduleList(Long teacherMemberId, String yearmonth) {
        memberRepository.findById(teacherMemberId)
            .orElseThrow(() -> new MemberNotFoundException(teacherMemberId));

        int year = Integer.parseInt(yearmonth.substring(0, 4));
        int month = Integer.parseInt(yearmonth.substring(4));

        List<LocalDate> existScheduleDates = tutoringScheduleRepository.getDateExistingScheduleByTeacherAndYearMonth(teacherMemberId, year, month);
        List<TeacherTutoringScheduleQueryDSLResponse> schedules = tutoringScheduleRepository.getTutoringScheduleListByTeacherAndYearMonth(teacherMemberId, existScheduleDates);


        List<TeacherTutoringScheduleListResponse> list = new ArrayList<>();
        for(LocalDate scheduleDate : existScheduleDates) {
            List<TeacherTutoringScheduleResponse> filteSchedules = schedules
                .stream()
                .filter(sch -> sch.getScheduleDate().equals(scheduleDate))
                .map(TeacherTutoringScheduleResponse::new)
                .collect(Collectors.toList());

            list.add(new TeacherTutoringScheduleListResponse(scheduleDate, filteSchedules.size(), filteSchedules));
        }

        return new MonthlyTeacherTutoringScheduleListResponse(list);
    }

    public MonthlyStudentTutoringScheduleListResponse getMonthlyStudentTutoringScheduleList(Long studentMemberId, String yearmonth) {
        memberRepository.findById(studentMemberId)
            .orElseThrow(() -> new MemberNotFoundException(studentMemberId));

        int year = Integer.parseInt(yearmonth.substring(0, 4));
        int month = Integer.parseInt(yearmonth.substring(4));

        List<LocalDate> existScheduleDates = tutoringScheduleRepository.getDateExistingScheduleByStudentAndYearMonth(studentMemberId, year, month);
        List<StudentTutoringScheduleQueryDSLResponse> schedules = tutoringScheduleRepository.getTutoringScheduleListByStudentAndYearMonth(studentMemberId, existScheduleDates);

        List<StudentTutoringScheduleListResponse> list = new ArrayList<>();
        for(LocalDate scheduleDate : existScheduleDates) {
            List<StudentTutoringScheduleResponse> filteSchedules = schedules
                .stream()
                .filter(sch -> sch.getScheduleDate().equals(scheduleDate))
                .map(StudentTutoringScheduleResponse::new)
                .collect(Collectors.toList());

            list.add(new StudentTutoringScheduleListResponse(scheduleDate, filteSchedules.size(), filteSchedules));
        }

        return new MonthlyStudentTutoringScheduleListResponse(list);
    }

    public TutoringScheduleDuplicateCheckResponse checkDuplicateTutoringScheduleExist(Long teacherMemberId, TutoringScheduleDuplicateCheckRequest request) {
        Tutoring tutoring = tutoringRepository.findByIdAndStatus(request.getTutoringId(), TutoringStatus.IN_PROGRESS)
            .orElseThrow(() ->  new TutoringNotFoundException(request.getTutoringId()));
        if(!tutoring.getTeacher().getId().equals(teacherMemberId)) {
            throw new AuthorizationException(teacherMemberId);
        }

        List<TutoringSchedule> duplicateScheduleByTeacher = getDuplicateScheduleByTeacher(teacherMemberId, request.getScheduleDate(), request.getStartTime(), request.getDuration());
        if(!duplicateScheduleByTeacher.isEmpty()) {
            return new TutoringScheduleDuplicateCheckResponse(true);
        }
        List<TutoringSchedule> duplicateScheduleByStudent = getDuplicateScheduleByStudent(tutoring.getStudent().getId(), request.getScheduleDate(), request.getStartTime(), request.getDuration());
        if(!duplicateScheduleByStudent.isEmpty()) {
            return new TutoringScheduleDuplicateCheckResponse(true);
        }

        return new TutoringScheduleDuplicateCheckResponse(false);
    }

    private List<TutoringSchedule> getDuplicateScheduleByTeacher(Long teacherMemberId, LocalDate scheduleDate, LocalTime startTime, int duration) {
        LocalDateTime startDateTime = LocalDateTime.of(scheduleDate, startTime);
        LocalDateTime endDatetime = startDateTime.plusMinutes(duration);

        return tutoringScheduleRepository.findTutoringSchedulesByTeacherAndDateRange(teacherMemberId, startDateTime, endDatetime);
    }

    private List<TutoringSchedule> getDuplicateScheduleByStudent(Long studentMemberId, LocalDate scheduleDate, LocalTime startTime, int duration) {
        LocalDateTime startDateTime = LocalDateTime.of(scheduleDate, startTime);
        LocalDateTime endDatetime = startDateTime.plusMinutes(duration);

        return tutoringScheduleRepository.findTutoringSchedulesByStudentAndDateRange(studentMemberId, startDateTime, endDatetime);
    }
}