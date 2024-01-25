package com.ioi.haryeom.homework.controller;

import com.amazonaws.Response;
import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.homework.dto.HomeworkDrawingRequest;
import com.ioi.haryeom.homework.dto.HomeworkLoadResponse;
import com.ioi.haryeom.homework.dto.HomeworkReviewResponse;
import com.ioi.haryeom.homework.service.HomeworkService;
import com.ioi.haryeom.member.domain.type.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RequestMapping("/api/homework")
@RequiredArgsConstructor
@RestController
public class StudentHomeworkController {

    private final HomeworkService homeworkService;

    AuthInfo authInfo = new AuthInfo(2L, Role.STUDENT.name());

    // 숙제 불러오기
    @GetMapping("/{homeworkId}")
    public ResponseEntity<HomeworkLoadResponse> getLoadHomework(@PathVariable Long homeworkId) {
        HomeworkLoadResponse homework = homeworkService.getLoadHomework(homeworkId, authInfo);

        return ResponseEntity.ok(homework);
    }

    // 숙제 불러오기(복습 시)
    @GetMapping("/review/{homeworkId}")
    public ResponseEntity<HomeworkReviewResponse> getReviewHomework(@PathVariable Long homeworkId) {
        HomeworkReviewResponse homework = homeworkService.getReviewHomework(homeworkId, authInfo);

        return ResponseEntity.ok(homework);
    }

    // 숙제 저장(숙제 드로잉 저장)
    @PostMapping("/{homeworkdId}")
    public ResponseEntity<Void> saveHomework(@PathVariable Long homeworkId, @RequestPart HomeworkDrawingRequest drawings) {

        homeworkService.saveHomework(homeworkId, drawings, authInfo);

        return ResponseEntity.ok().build();
    }

    // 숙제 저장(복습 드로잉 저장)
    @PostMapping("/{homeworkId}/review")
    public ResponseEntity<Void> saveHomeworkReview(@PathVariable Long homeworkId, @RequestPart HomeworkDrawingRequest drawings) {

        homeworkService.saveHomeworkReview(homeworkId, drawings, authInfo);

        return ResponseEntity.ok().build();
    }

    // 숙제 제출
    @PostMapping("/{homeworkId}")
    public ResponseEntity<Void> submitHomework(@PathVariable Long homeworkId) {
        homeworkService.submitHomework(homeworkId, authInfo);
        return ResponseEntity.ok().build();
    }


}
