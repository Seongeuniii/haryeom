package com.ioi.haryeom.homework.controller;

import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.homework.dto.HomeworkNewLoadResponse;
import com.ioi.haryeom.homework.dto.HomeworkOngoingLoadResponse;
import com.ioi.haryeom.homework.dto.HomeworkReviewResponse;
import com.ioi.haryeom.homework.service.HomeworkService;
import com.ioi.haryeom.member.domain.type.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/homework")
@RequiredArgsConstructor
@RestController
public class StudentHomeworkController {

    private final HomeworkService homeworkService;

    AuthInfo authInfo = new AuthInfo(2L, Role.STUDENT.name());

    @GetMapping("/new/{homeworkId}")
    public ResponseEntity<HomeworkNewLoadResponse> getNewHomework(@PathVariable Long homeworkId) {
        HomeworkNewLoadResponse homework = homeworkService.getNewHomework(homeworkId, authInfo);

        return ResponseEntity.ok(homework);
    }

    @GetMapping("/ongoing/{homeworkId}")
    public ResponseEntity<HomeworkOngoingLoadResponse> getOngoingHomework(@PathVariable Long homeworkId) {
        HomeworkOngoingLoadResponse homework = homeworkService.getOngoingHomework(homeworkId, authInfo);

        return ResponseEntity.ok(homework);
    }

    @GetMapping("/review/{homeworkId}")
    public ResponseEntity<HomeworkReviewResponse> getReviewHomework(@PathVariable Long homeworkId) {
        HomeworkReviewResponse homework = homeworkService.getReviewHomework(homeworkId, authInfo);

        return ResponseEntity.ok(homework);
    }

}
