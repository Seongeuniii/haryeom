package com.ioi.haryeom.homework.controller;

import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.homework.dto.HomeworkListResponse;
import com.ioi.haryeom.homework.service.HomeworkService;
import com.ioi.haryeom.member.domain.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/tutoring")
@RequiredArgsConstructor
@RestController
public class HomeworkController {

    private final HomeworkService homeworkService;

    // 과외 숙제 리스트 조회
    @GetMapping("/{tutoringId}/homework")
    public ResponseEntity<HomeworkListResponse> getHomeworkList(@PathVariable Long tutoringId, @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "10") Integer pageSize) {

        HomeworkListResponse homeworkList = homeworkService.getHomeworkList(tutoringId, page, pageSize);
        return ResponseEntity.ok(homeworkList);
    }
}
