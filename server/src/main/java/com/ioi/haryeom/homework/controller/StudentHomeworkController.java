package com.ioi.haryeom.homework.controller;

import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.homework.dto.HomeworkLoadResponse;
import com.ioi.haryeom.homework.dto.HomeworkReviewResponse;
import com.ioi.haryeom.homework.service.HomeworkService;
import com.ioi.haryeom.member.domain.type.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/api/homework")
@RequiredArgsConstructor
@RestController
public class StudentHomeworkController {

    private final HomeworkService homeworkService;

    AuthInfo authInfo = new AuthInfo(2L, Role.STUDENT.name());

    // 숙제 불러오기
    @GetMapping("/{homeworkId}")
    public ResponseEntity<HomeworkLoadResponse> getLoadHomework(@PathVariable Long homeworkId, @AuthMemberId Long memberId) {
        HomeworkLoadResponse homework = homeworkService.getLoadHomework(homeworkId, memberId);

        return ResponseEntity.ok(homework);
    }

    // 숙제 불러오기(복습 시)
    @GetMapping("/review/{homeworkId}")
    public ResponseEntity<HomeworkReviewResponse> getReviewHomework(@PathVariable Long homeworkId, @AuthMemberId Long memberId) {
        HomeworkReviewResponse homework = homeworkService.getReviewHomework(homeworkId, memberId);

        return ResponseEntity.ok(homework);
    }

    // 숙제 저장(숙제 드로잉 저장)
    @PostMapping(value = "/{homeworkdId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> saveHomework(@PathVariable Long homeworkId, @RequestPart("file") List<MultipartFile> file, @RequestPart("page") List<Integer> page, @AuthMemberId Long memberId) {

        homeworkService.saveHomework(homeworkId, file, page, memberId);

        return ResponseEntity.ok().build();
    }

    // 숙제 저장(복습 드로잉 저장)
    @PostMapping(value = "/{homeworkId}/review", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> saveHomeworkReview(@PathVariable Long homeworkId, @RequestPart("file") List<MultipartFile> file, @RequestPart("page") List<Integer> page, @AuthMemberId Long memberId) {

        homeworkService.saveHomeworkReview(homeworkId, file, page, memberId);

        return ResponseEntity.ok().build();
    }

    // 숙제 제출
    @PostMapping("/{homeworkId}")
    public ResponseEntity<Void> submitHomework(@PathVariable Long homeworkId, @AuthMemberId Long memberId) {
        homeworkService.submitHomework(homeworkId, memberId);
        return ResponseEntity.ok().build();
    }


}
