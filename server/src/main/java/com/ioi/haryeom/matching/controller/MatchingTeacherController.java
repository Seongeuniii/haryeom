package com.ioi.haryeom.matching.controller;

import static org.springframework.data.domain.Sort.Direction.DESC;

import com.ioi.haryeom.matching.dto.MatchingTeacherRequest;
import com.ioi.haryeom.matching.dto.TeacherResponse;
import com.ioi.haryeom.matching.service.MatchingTeacherService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/matching/teachers")
@RequiredArgsConstructor
@RestController
public class MatchingTeacherController {

    private final MatchingTeacherService matchingTeacherService;

    // 선생님 목록 조회
    @GetMapping("")
    public ResponseEntity<List<TeacherResponse>> getTeacherList(@ModelAttribute MatchingTeacherRequest request,
        @PageableDefault(sort = "createdAt", direction = DESC) Pageable pageable) {

        List<TeacherResponse> response = matchingTeacherService.getTeacherList(request, pageable);
        return ResponseEntity.ok(response);
    }
}
