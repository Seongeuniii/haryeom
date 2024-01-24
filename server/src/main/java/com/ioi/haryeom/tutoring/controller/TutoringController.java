package com.ioi.haryeom.tutoring.controller;

import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.tutoring.dto.StudentTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringListResponse;
import com.ioi.haryeom.tutoring.service.TutoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
