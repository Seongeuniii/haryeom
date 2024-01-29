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
import com.ioi.haryeom.tutoring.dto.TeacherTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleIdsResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleListRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleResponse;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.exception.TutoringScheduleNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
        Tutoring tutoring = tutoringRepository.findById(request.getTutoringId())
            .orElseThrow(() ->  new TutoringNotFoundException(request.getTutoringId()));
        if(!tutoring.getTeacher().getId().equals(teacherMemberId)) {
            throw new AuthorizationException(teacherMemberId);
        }

        // TODO: 겹치는 과외 일정 있는 경우 예외 처리 필요

        List<Long> savedScheduleIds = new ArrayList<>();
        for(TutoringScheduleRequest scheduleRequest : request.getSchedules()) {
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

        // TODO: 겹치는 과외 일정 있는 경우 예외 처리 필요

        tutoringSchedule.update(tutoringSchedule.getTutoring(), request.getScheduleDate(), request.getStartTime(), request.getDuration(), request.getTitle());

        tutoringScheduleRepository.save(tutoringSchedule);
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

//    public MonthlyTeacherTutoringScheduleListResponse getMonthlyTeacherTutoringScheduleList(Member member, String yearmonth) {
//
//        int year = Integer.parseInt(yearmonth.substring(0, 4));
//        int month = Integer.parseInt(yearmonth.substring(4));
//
//        List<TeacherTutoringScheduleListResponse> list = tutoringScheduleRepository.getMonthlyTeacherTutoringScheduleList(member.getId(), year, month);
//
//        return new MonthlyTeacherTutoringScheduleListResponse(list);
//    }
//
//    public MonthlyStudentTutoringScheduleListResponse getMonthlyStudentTutoringScheduleList(Member member, String yearmonth) {
//
//        int year = Integer.parseInt(yearmonth.substring(0, 4));
//        int month = Integer.parseInt(yearmonth.substring(4));
//
//        List<StudentTutoringScheduleListResponse> list = tutoringScheduleRepository.getMonthlyStudentTutoringScheduleList(member.getId(), year, month);
//
//        return new MonthlyStudentTutoringScheduleListResponse(list);
//    }
}
