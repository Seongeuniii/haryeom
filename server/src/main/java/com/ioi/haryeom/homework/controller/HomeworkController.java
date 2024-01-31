package com.ioi.haryeom.homework.controller;

import static org.springframework.data.domain.Sort.Direction.ASC;

import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.homework.dto.HomeworkListResponse;
import com.ioi.haryeom.homework.dto.HomeworkRequest;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.service.HomeworkService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/tutoring")
@RequiredArgsConstructor
@RestController
public class HomeworkController {

    private final HomeworkService homeworkService;

    // 과외 숙제 리스트 조회
    @GetMapping("/{tutoringId}/homework")
    public ResponseEntity<HomeworkListResponse> getHomeworkList(@PathVariable Long tutoringId,
        @PageableDefault(sort = "deadline", direction = ASC) Pageable pageable, @AuthMemberId Long memberId) {
        HomeworkListResponse homeworkList = homeworkService.getHomeworkList(tutoringId, pageable, memberId);
        return ResponseEntity.ok(homeworkList);
    }

    // 과외 숙제 등록
    @PostMapping("/{tutoringId}/homework")
    public ResponseEntity<Void> createHomework(@PathVariable Long tutoringId, @RequestBody @Validated HomeworkRequest request,
        @AuthMemberId Long memberId) {
        Long homeworkId = homeworkService.createHomework(tutoringId, request, memberId);
        return ResponseEntity.created(URI.create("/homework/" + homeworkId)).build();
    }

    // 과외 숙제 상세 조회
    @GetMapping("/{tutoringId}/homework/{homeworkId}")
    public ResponseEntity<HomeworkResponse> getHomework(@PathVariable Long tutoringId, @PathVariable Long homeworkId, @AuthMemberId Long memberId) {
        HomeworkResponse response = homeworkService.getHomework(tutoringId, homeworkId, memberId);
        return ResponseEntity.ok(response);
    }

    // 과외 숙제 수정
    @PutMapping("/{tutoringId}/homework/{homeworkId}")
    public ResponseEntity<Void> updateHomework(@PathVariable Long tutoringId, @PathVariable Long homeworkId,
        @RequestBody @Validated HomeworkRequest request, @AuthMemberId Long memberId) {
        homeworkService.updateHomework(tutoringId, homeworkId, request, memberId);
        return ResponseEntity.noContent().build();
    }

    // 과외 숙제 삭제
    @DeleteMapping("/{tutoringId}/homework/{homeworkId}")
    public ResponseEntity<Void> deleteHomework(@PathVariable Long tutoringId, @PathVariable Long homeworkId, @AuthMemberId Long memberId) {
        homeworkService.deleteHomework(tutoringId, homeworkId, memberId);
        return ResponseEntity.noContent().build();
    }
}
