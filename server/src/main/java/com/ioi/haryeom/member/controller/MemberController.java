package com.ioi.haryeom.member.controller;


import static org.springframework.http.HttpStatus.CREATED;

import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.member.dto.CodeCertifyRequest;
import com.ioi.haryeom.member.dto.EmailCertifyRequest;
import com.ioi.haryeom.member.dto.StudentCreateRequest;
import com.ioi.haryeom.member.dto.StudentInfoResponse;
import com.ioi.haryeom.member.dto.TeacherCreateRequest;
import com.ioi.haryeom.member.dto.TeacherInfoResponse;
import com.ioi.haryeom.member.dto.TeacherUpdateRequest;
import com.ioi.haryeom.member.service.MemberService;
import java.io.IOException;
import java.net.URI;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/members")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/emails/certify")
    public ResponseEntity<Void> certifyEmail(@RequestBody EmailCertifyRequest certifyRequest) {
        memberService.certifyEmail(certifyRequest);
        return ResponseEntity.status(CREATED).build();
    }

    @PostMapping("/emails/certifycode")
    public ResponseEntity<Void> certifyCode(@RequestBody CodeCertifyRequest certifyRequest) {
        memberService.certifyCode(certifyRequest);
        return ResponseEntity.status(CREATED).build();
    }

    @GetMapping("/emails/check")
    public ResponseEntity<Void> certifyUniv(@RequestParam String univName) {
        memberService.certifyUniv(univName);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/students", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> createStudent(@AuthMemberId Long userId,
        @RequestPart(value = "profileImg", required = false) MultipartFile profileImg,
        @RequestPart("request") StudentCreateRequest createRequest) {

        return ResponseEntity.created(URI.create(
                "/members/students/" + memberService.createStudent(userId, profileImg, createRequest)))
            .build();
    }

    @GetMapping("/students/{memberId}")
    public ResponseEntity<StudentInfoResponse> getStudent(
        @PathVariable("memberId") Long memberId) {

        return ResponseEntity.ok().body(memberService.getStudent(memberId));
    }

    @PutMapping(value = "/students", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> updateStudent(@AuthMemberId Long userId,
        @RequestPart(value = "profileImg", required = false) MultipartFile profileImg,
        @RequestPart("request") StudentInfoResponse studentRequest) {
        memberService.updateStudent(userId, profileImg, studentRequest);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/teachers", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> createTeacher(@AuthMemberId Long userId,
        @RequestPart(value = "profileImg", required = false) MultipartFile profileImg,
        @RequestPart("request") TeacherCreateRequest teacherRequest) {

        return ResponseEntity.created(URI.create(
                "/members/teachers/" + memberService.createTeacher(userId, profileImg, teacherRequest)))
            .build();
    }

    @GetMapping("/teachers/{memberId}")
    public ResponseEntity<TeacherInfoResponse> getTeacher(@PathVariable("memberId") Long memberId) {
        return ResponseEntity.ok().body(memberService.getTeacher(memberId));
    }

    @PutMapping(value = "/teachers", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> updateTeacher(@AuthMemberId Long userId,
        @RequestPart(value = "profileImg", required = false) MultipartFile profileImg,
        @RequestPart("request")
        TeacherUpdateRequest teacherRequest) {
        memberService.updateTeacher(userId, profileImg, teacherRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember(@AuthMemberId Long userId,
        HttpServletResponse response) throws IOException {
        memberService.deleteMember(userId, response);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/students/mypage")
    public ResponseEntity<StudentInfoResponse> getMyStudent(
        @AuthMemberId Long userId) {
        return ResponseEntity.ok().body(memberService.getStudent(userId));
    }

    @GetMapping("/teachers/mypage")
    public ResponseEntity<TeacherInfoResponse> getMyTeacher(
        @AuthMemberId Long userId) {
        return ResponseEntity.ok().body(memberService.getTeacher(userId));
    }

}
