package com.ioi.haryeom.homework.controller;

import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.homework.dto.HomeworkLoadResponse;
import com.ioi.haryeom.homework.dto.HomeworkReviewResponse;
import com.ioi.haryeom.homework.service.HomeworkService;
import com.ioi.haryeom.member.domain.type.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/homework")
@RequiredArgsConstructor
@RestController
public class StudentHomeworkController {

    private final HomeworkService homeworkService;

    AuthInfo authInfo = new AuthInfo(2L, Role.STUDENT.name());

//    @GetMapping("/{homeworkId}")
//    public ResponseEntity<HomeworkNewLoadResponse> getNewHomework(@PathVariable Long homeworkId) {
//        HomeworkNewLoadResponse homework = homeworkService.getNewHomework(homeworkId, authInfo);
//
//        return ResponseEntity.ok(homework);
//    }

    // 숙제 불러오기
    @GetMapping("/{homeworkId}")
    public ResponseEntity<HomeworkLoadResponse> getLoadHomework(@PathVariable Long homeworkId) {
        HomeworkLoadResponse homework = homeworkService.getLoadHomework(homeworkId, authInfo);

        return ResponseEntity.ok(homework);
    }

    @GetMapping("/review/{homeworkId}")
    public ResponseEntity<HomeworkReviewResponse> getReviewHomework(@PathVariable Long homeworkId) {
        HomeworkReviewResponse homework = homeworkService.getReviewHomework(homeworkId, authInfo);

        return ResponseEntity.ok(homework);
    }

    @PostMapping("/{homeworkId}")
    public ResponseEntity<Void> submitHomework(@PathVariable Long homeworkId) {
        homeworkService.submitHomework(homeworkId, authInfo);
        return ResponseEntity.ok().build();
    }


}
