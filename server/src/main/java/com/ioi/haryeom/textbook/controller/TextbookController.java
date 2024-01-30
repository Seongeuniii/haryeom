package com.ioi.haryeom.textbook.controller;

import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.common.util.AuthMemberRole;
import com.ioi.haryeom.member.domain.type.Role;
import com.ioi.haryeom.textbook.domain.Textbook;
import com.ioi.haryeom.textbook.dto.TextbookListByTutoringResponse;
import com.ioi.haryeom.textbook.dto.TextbookRequest;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.textbook.dto.TextbookWithStudentsResponse;
import com.ioi.haryeom.textbook.service.TextbookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RequestMapping("/api/textbook")
@RequiredArgsConstructor
@RestController
public class TextbookController {

    private final TextbookService textbookService;
    //TODO: 인증 관련 로직 개발 후 변경 예정
    AuthInfo authInfo = new AuthInfo(1L, Role.TEACHER.name());

    // 학습자료 추가
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> createTextbook(@RequestPart("file") MultipartFile file, @RequestPart("request") TextbookRequest request, @AuthMemberId Long teacherMemberId) {

        Long textbookId = textbookService.createTextbook(file, request, teacherMemberId);
        return ResponseEntity.created(URI.create("textbook/" + textbookId)).build();
    }

    // 과와별 학습자료 리스트 조회
    @GetMapping("/tutoring/{tutoringId}")
    public ResponseEntity<List<TextbookListByTutoringResponse>> getTextbookList(@PathVariable Long tutoringId) {

        List<TextbookListByTutoringResponse> textbookList = textbookService.getTextbookListByTutoring(tutoringId);
        return ResponseEntity.ok(textbookList);
    }

    // 선생님 학습자료 리스트 조회
    @GetMapping("/teachers/{memberId}")
    public ResponseEntity<List<TextbookWithStudentsResponse>> getTeacherTextbookList(@PathVariable Long memberId, @AuthMemberId Long teacherMemberId) {
        List<TextbookWithStudentsResponse> textbooks = textbookService.getTextbooksWithStudents(memberId, teacherMemberId);
        return ResponseEntity.ok(textbooks);
    }

    // 학습자료 삭제
    @DeleteMapping("/{textbookId}")
    public ResponseEntity<Void> deleteTextbook(@PathVariable Long textbookId, @AuthMemberId Long teacherMemberId) {

        textbookService.deleteTextbook(textbookId, teacherMemberId);
        return ResponseEntity.noContent().build();
    }

    // 학습자료 불러오기
    @GetMapping("/{textbookId}")
    public ResponseEntity<TextbookResponse> getTextbook(@PathVariable Long textbookId) {

        TextbookResponse textbook = textbookService.getTextbook(textbookId);
        return ResponseEntity.ok(textbook);
    }

    // 학습자료별 지정 가능 학생 리스트 조회
    @GetMapping("/{textbookId}/students")
    public ResponseEntity<List<TextbookWithStudentsResponse.StudentInfo>> getAssignableStudent(@PathVariable Long textbookId, @AuthMemberId Long teacherMemberId) {
        List<TextbookWithStudentsResponse.StudentInfo> studentInfos = textbookService.getAssignableStudent(textbookId, teacherMemberId);

        return ResponseEntity.ok(studentInfos);
    }

    // 학습자료 학생 지정
    @PutMapping("/{textbookId}/students")
    public ResponseEntity<Void> putAssignment(@PathVariable Long textbookId, @RequestParam List<Long> tutoringIds) {

        textbookService.putAssignment(textbookId, tutoringIds);
        return ResponseEntity.noContent().build();
    }
}
