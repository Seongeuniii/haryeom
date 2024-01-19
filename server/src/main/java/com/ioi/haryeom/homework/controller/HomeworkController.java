package com.ioi.haryeom.homework.controller;

import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.homework.dto.HomeworkListResponse;
import com.ioi.haryeom.homework.dto.HomeworkRequest;
import com.ioi.haryeom.homework.service.HomeworkService;
import com.ioi.haryeom.member.domain.Role;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/tutoring")
@RequiredArgsConstructor
@RestController
public class HomeworkController {

    //TODO: 인증 관련 로직 개발 후 변경 예정
    AuthInfo authInfo = new AuthInfo(1L, Role.TEACHER.name());

    private final HomeworkService homeworkService;

    // 과외 숙제 리스트 조회
    @GetMapping("/{tutoringId}/homework")
    public ResponseEntity<HomeworkListResponse> getHomeworkList(@PathVariable Long tutoringId, @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "10") Integer pageSize) {

        HomeworkListResponse homeworkList = homeworkService.getHomeworkList(tutoringId, page, pageSize);
        return ResponseEntity.ok(homeworkList);
    }

    // 과외 숙제 등록
    @PostMapping("/{tutoringId}/homework")
    public ResponseEntity<Void> createHomework(@PathVariable Long tutoringId, @RequestBody HomeworkRequest request) {

        Long homeworkId = homeworkService.createHomework(tutoringId, request, authInfo);
        return ResponseEntity.created(URI.create("/homework/" + homeworkId)).build();
    }

    // 과외 숙제 수정
    @PutMapping("/{tutoringId}/homework/{homeworkId}")
    public ResponseEntity<Void> updateHomework(@PathVariable Long tutoringId, @PathVariable Long homeworkId, @RequestBody HomeworkRequest request) {

        homeworkService.updateHomework(tutoringId, homeworkId, request, authInfo);
        return ResponseEntity.noContent().build();
    }

    // 과외 숙제 삭제
    @DeleteMapping("/{tutoringId}/homework/{homeworkId}")
    public ResponseEntity<Void> deleteHomework(@PathVariable Long tutoringId, @PathVariable Long homeworkId) {

        homeworkService.deleteHomework(tutoringId, homeworkId, authInfo);
        return ResponseEntity.noContent().build();
    }
}
