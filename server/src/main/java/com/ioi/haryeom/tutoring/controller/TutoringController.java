package com.ioi.haryeom.tutoring.controller;

import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.tutoring.dto.MonthlyStudentTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.MonthlyTeacherTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleDuplicateCheckRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleDuplicateCheckResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleIdsResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleListRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleResponse;
import com.ioi.haryeom.tutoring.service.TutoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/tutoring")
@RequiredArgsConstructor
@RestController
public class TutoringController {

    private final TutoringService tutoringService;


    /**
     * 선생님의 과외 목록(리스트) 조회(현재 진행중 상태(IN_PROGRESS)만 조회)
     * @param teacherMemberId
     * @return
     */
    @GetMapping("/teachers")
    public ResponseEntity<TeacherTutoringListResponse> getTeacherTutoringList(@AuthMemberId Long teacherMemberId) {
        TeacherTutoringListResponse tutoringList = tutoringService.getTeacherTutoringList(teacherMemberId);

        return ResponseEntity.ok(tutoringList);
    }

    /**
     * 학생의 과외 목록(리스트) 조회(현재 진행중 상태(IN_PROGRESS)만 조회)
     * @param studentMemberId
     * @return
     */
    @GetMapping("/students")
    public ResponseEntity<StudentTutoringListResponse> getStudentTutoringList(@AuthMemberId Long studentMemberId) {
        StudentTutoringListResponse tutoringList = tutoringService.getStudentTutoringList(studentMemberId);

        return ResponseEntity.ok(tutoringList);
    }

    /**
     * 선생님이 본인 과외 중 특정 과외에 대한 일정들을 등록
     * @param teacherMemberId
     * @param request
     * @return
     */
    @PostMapping("/schedule")
    public ResponseEntity<TutoringScheduleIdsResponse> createTutoringSchedules(@AuthMemberId Long teacherMemberId, @RequestBody @Validated TutoringScheduleListRequest request) {
        TutoringScheduleIdsResponse tutoringScheduleIds = tutoringService.createTutoringSchedules(teacherMemberId, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(tutoringScheduleIds);
    }

    /**
     * 선생님이 본인 과외 일정에 대해 상세 조회
     * @param teacherMemberId
     * @param tutoringScheduleId
     * @return
     */
    @GetMapping("/schedule/{tutoringScheduleId}")
    public ResponseEntity<TutoringScheduleResponse> getTutoringSchedule(@AuthMemberId Long teacherMemberId, @PathVariable Long tutoringScheduleId) {
        TutoringScheduleResponse response = tutoringService.getTutoringSchedule(teacherMemberId, tutoringScheduleId);

        return ResponseEntity.ok(response);
    }

    /**
     * 선생님이 본인 과외 일정에 대해 수정(날짜, 시작 시간, 진행시간, 커리큘럼명만 수정 가능)
     * @param teacherMemberId
     * @param tutoringScheduleId
     * @param request
     * @return
     */
    @PutMapping("/schedule/{tutoringScheduleId}")
    public ResponseEntity<Void> updateTutoringSchedule(@AuthMemberId Long teacherMemberId, @PathVariable Long tutoringScheduleId, @RequestBody @Validated TutoringScheduleRequest request) {
        tutoringService.updateTutoringSchedule(teacherMemberId, tutoringScheduleId, request);

        return ResponseEntity.noContent().build();
    }

    /**
     * 선생님이 본인 과외 일정을 삭제
     * @param teacherMemberId
     * @param tutoringScheduleId
     * @return
     */
    @DeleteMapping("/schedule/{tutoringScheduleId}")
    public ResponseEntity<Void> deleteTutoringSchedule(@AuthMemberId Long teacherMemberId, @PathVariable Long tutoringScheduleId) {
        tutoringService.deleteTutoringSchedule(teacherMemberId, tutoringScheduleId);

        return ResponseEntity.noContent().build();
    }

    /**
     * 선생님이 본인의 월별 과외 일정을 조회
     * @param teacherMemberId
     * @param yearmonth
     * @return
     */
    @GetMapping("/schedule/teacher")
    public ResponseEntity<MonthlyTeacherTutoringScheduleListResponse> getMonthlyTeacherTutoringScheduleList(@AuthMemberId Long teacherMemberId, @RequestParam String yearmonth) {
        MonthlyTeacherTutoringScheduleListResponse response = tutoringService.getMonthlyTeacherTutoringScheduleList(teacherMemberId, yearmonth);

        return ResponseEntity.ok(response);
    }

    /**
     * 학생이 본인의 월별 과외 일정을 조회
     * @param studentMemberId
     * @param yearmonth
     * @return
     */
    @GetMapping("/schedule/student")
    public ResponseEntity<MonthlyStudentTutoringScheduleListResponse> getMonthlyStudentTutoringScheduleList(@AuthMemberId Long studentMemberId, @RequestParam String yearmonth) {
        MonthlyStudentTutoringScheduleListResponse response = tutoringService.getMonthlyStudentTutoringScheduleList(studentMemberId, yearmonth);

        return ResponseEntity.ok(response);
    }

    /**
     * 과외 일정의 Duplicate 여부 확인
     * @param teacherMemberId
     * @param request
     * @return
     */
    @GetMapping("/schedule/duplicate")
    public ResponseEntity<TutoringScheduleDuplicateCheckResponse> checkDuplicateTutoringScheduleExist(@AuthMemberId Long teacherMemberId, @RequestBody @Validated TutoringScheduleDuplicateCheckRequest request) {
        TutoringScheduleDuplicateCheckResponse response = tutoringService.checkDuplicateTutoringScheduleExist(teacherMemberId, request);

        return ResponseEntity.ok(response);
    }
}