package com.ioi.haryeom.member.controller;


import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.dto.StudentCreateRequest;
import com.ioi.haryeom.member.dto.StudentInfoResponse;
import com.ioi.haryeom.member.dto.TeacherCreateRequest;
import com.ioi.haryeom.member.dto.TeacherInfoResponse;
import com.ioi.haryeom.member.service.MemberService;
import java.io.IOException;
import java.net.URI;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/members")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/students")
    public ResponseEntity<Void> createStudent(@AuthenticationPrincipal Member user,
        @RequestBody StudentCreateRequest createRequest) {

        Long memberId = memberService.createStudent(user, createRequest);
        return ResponseEntity.created(URI.create("/members/students/" + memberId)).build();
    }

    @GetMapping("/students/{memberId}")
    public ResponseEntity<StudentInfoResponse> getStudent(
        @PathVariable("memberId") Long memberId) {

        return ResponseEntity.ok().body(memberService.getStudent(memberId));
    }

    @PutMapping("/students")
    public ResponseEntity<Void> updateStudent(@AuthenticationPrincipal Member user,
        @RequestBody StudentInfoResponse studentRequest) {
        memberService.updateStudent(user, studentRequest);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/teachers")
    public ResponseEntity<Void> createTeacher(@AuthenticationPrincipal Member user,
        @RequestBody TeacherCreateRequest teacherRequest) {

        Long memberId = memberService.createTeacher(user, teacherRequest);
        return ResponseEntity.created(URI.create("/members/teachers/" + memberId)).build();
    }

    @GetMapping("/teachers/{memberId}")
    public ResponseEntity<TeacherInfoResponse> getTeacher(@PathVariable("memberId") Long memberId) {
        return ResponseEntity.ok().body(memberService.getTeacher(memberId));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember(@AuthenticationPrincipal Member user,
        HttpServletResponse response) throws IOException {
        memberService.deleteMember(user, response);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/students/mypage")
    public ResponseEntity<StudentInfoResponse> getMyStudent(
        @AuthenticationPrincipal Member member) {
        return ResponseEntity.ok().body(memberService.getStudent(member.getId()));
    }

    @GetMapping("/teachers/mypage")
    public ResponseEntity<TeacherInfoResponse> getMyTeacher(
        @AuthenticationPrincipal Member member) {
        return ResponseEntity.ok().body(memberService.getTeacher(member.getId()));
    }

}
