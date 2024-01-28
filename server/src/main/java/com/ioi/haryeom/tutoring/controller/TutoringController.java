package com.ioi.haryeom.tutoring.controller;

import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.tutoring.dto.MonthlyStudentTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.MonthlyTeacherTutoringScheduleListResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleIdsResponse;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleListRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleRequest;
import com.ioi.haryeom.tutoring.dto.TutoringScheduleResponse;
import com.ioi.haryeom.tutoring.service.TutoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
     * @param member SpringSecurity로 들어온 사용자 정보
     * @return
     */
    @GetMapping("/teachers")
    public ResponseEntity<TeacherTutoringListResponse> getTeacherTutoringList(@AuthenticationPrincipal Member member) {
        TeacherTutoringListResponse tutoringList = tutoringService.getTeacherTutoringList(member);

        return ResponseEntity.ok(tutoringList);
    }

    /**
     * 학생의 과외 목록(리스트) 조회(현재 진행중 상태(IN_PROGRESS)만 조회)
     * @param member SpringSecurity로 들어온 사용자 정보
     * @return
     */
    @GetMapping("/students")
    public ResponseEntity<StudentTutoringListResponse> getStudentTutoringList(@AuthenticationPrincipal Member member) {
        StudentTutoringListResponse tutoringList = tutoringService.getStudentTutoringList(member);

        return ResponseEntity.ok(tutoringList);
    }

    /**
     * 선생님이 본인 과외 중 특정 과외에 대한 일정들을 등록
     * @param member
     * @param request
     * @return
     */
    @PostMapping("/schedule")
    public ResponseEntity<TutoringScheduleIdsResponse> createTutoringSchedules(@AuthenticationPrincipal Member member, @RequestBody @Validated TutoringScheduleListRequest request) {
        TutoringScheduleIdsResponse tutoringScheduleIds = tutoringService.createTutoringSchedules(member, request);

        return ResponseEntity.status(HttpStatus.CREATED).body(tutoringScheduleIds);
    }

    /**
     * 선생님이 본인 과외 일정에 대해 상세 조회
     * @param member
     * @param tutoringScheduleId
     * @return
     */
    @GetMapping("/schedule/{tutoringScheduleId}")
    public ResponseEntity<TutoringScheduleResponse> getTutoringSchedule(@AuthenticationPrincipal Member member, @PathVariable Long tutoringScheduleId) {
        TutoringScheduleResponse response = tutoringService.getTutoringSchedule(member, tutoringScheduleId);

        return ResponseEntity.ok(response);
    }

    /**
     * 선생님이 본인 과외 일정에 대해 수정(날짜, 시작 시간, 진행시간, 커리큘럼명만 수정 가능)
     * @param member
     * @param tutoringScheduleId
     * @param request
     * @return
     */
    @PutMapping("/schedule/{tutoringScheduleId}")
    public ResponseEntity<Void> updateTutoringSchedule(@AuthenticationPrincipal Member member, @PathVariable Long tutoringScheduleId, @RequestBody TutoringScheduleRequest request) {
        tutoringService.updateTutoringSchedule(member, tutoringScheduleId, request);

        return ResponseEntity.noContent().build();
    }

    /**
     * 선생님이 본인 과외 일정을 삭제
     * @param member
     * @param tutoringScheduleId
     * @return
     */
    @DeleteMapping("/schedule/{tutoringScheduleId}")
    public ResponseEntity<Void> deleteTutoringSchedule(@AuthenticationPrincipal Member member, @PathVariable Long tutoringScheduleId) {
        tutoringService.deleteTutoringSchedule(member, tutoringScheduleId);

        return ResponseEntity.noContent().build();
    }


//    @GetMapping("/schedule/teacher")
//    public ResponseEntity<MonthlyTeacherTutoringScheduleListResponse> getMonthlyTeacherTutoringScheduleList(@AuthenticationPrincipal Member member, @RequestParam String yearmonth) {
//        MonthlyTeacherTutoringScheduleListResponse response = tutoringService.getMonthlyTeacherTutoringScheduleList(member, yearmonth);
//
//        return ResponseEntity.ok(response);
//    }
//
//
//    @GetMapping("/schedule/student")
//    public ResponseEntity<MonthlyStudentTutoringScheduleListResponse> getMonthlyStudentTutoringScheduleList(@AuthenticationPrincipal Member member, @RequestParam String yearmonth) {
//        MonthlyStudentTutoringScheduleListResponse response = tutoringService.getMonthlyStudentTutoringScheduleList(member, yearmonth);
//
//        return ResponseEntity.ok(response);
//    }
}
