package com.ioi.haryeom.homework.controller;

import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.common.util.AuthMemberRole;
import com.ioi.haryeom.homework.dto.HomeworkDrawingRequest;
import com.ioi.haryeom.homework.dto.HomeworkLoadResponse;
import com.ioi.haryeom.homework.dto.HomeworkReviewResponse;
import com.ioi.haryeom.homework.service.HomeworkService;
import com.ioi.haryeom.member.domain.type.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/homework")
@RequiredArgsConstructor
@RestController
public class StudentHomeworkController {

    private final HomeworkService homeworkService;

    AuthInfo authInfo = new AuthInfo(2L, Role.STUDENT.name());

    // 숙제 불러오기
    @GetMapping("/{homeworkId}")
    public ResponseEntity<HomeworkLoadResponse> getLoadHomework(@PathVariable Long homeworkId, @AuthMemberRole Role role) {
        HomeworkLoadResponse homework = homeworkService.getLoadHomework(homeworkId, role);

        return ResponseEntity.ok(homework);
    }

    // 숙제 불러오기(복습 시)
    @GetMapping("/review/{homeworkId}")
    public ResponseEntity<HomeworkReviewResponse> getReviewHomework(@PathVariable Long homeworkId, @AuthMemberRole Role role) {
        HomeworkReviewResponse homework = homeworkService.getReviewHomework(homeworkId, role);

        return ResponseEntity.ok(homework);
    }

    // 숙제 저장(숙제 드로잉 저장)
    @PostMapping(value = "/{homeworkdId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> saveHomework(@PathVariable Long homeworkId, @RequestPart HomeworkDrawingRequest drawings, @AuthMemberRole Role role) {

        homeworkService.saveHomework(homeworkId, drawings, role);

        return ResponseEntity.ok().build();
    }

    // 숙제 저장(복습 드로잉 저장)
    @PostMapping(value = "/{homeworkId}/review", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> saveHomeworkReview(@PathVariable Long homeworkId, @RequestPart HomeworkDrawingRequest drawings, @AuthMemberRole Role role) {

        homeworkService.saveHomeworkReview(homeworkId, drawings, role);

        return ResponseEntity.ok().build();
    }

    // 숙제 제출
    @PostMapping("/{homeworkId}")
    public ResponseEntity<Void> submitHomework(@PathVariable Long homeworkId, @AuthMemberRole Role role) {
        homeworkService.submitHomework(homeworkId, role);
        return ResponseEntity.ok().build();
    }


}
