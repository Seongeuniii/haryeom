package com.ioi.haryeom.matching.controller;


import com.ioi.haryeom.matching.dto.CreateMatchingRequest;
import com.ioi.haryeom.matching.dto.RespondToMatchingRequest;
import com.ioi.haryeom.matching.service.MatchingService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    private MatchingService matchingService;
    private Long memberId = 2L;


    // 과외 매칭 요청
    @PostMapping("/request")
    public ResponseEntity<Void> createMatchingRequest(@RequestBody CreateMatchingRequest request) {

        String matchingId = matchingService.createMatchingRequest(request, memberId);

        // 생성된 matchingId 반환
        return ResponseEntity.created(URI.create("/matching/" + matchingId)).build();
    }

    // 과외 매칭 응답
    @PostMapping("/response")
    public ResponseEntity<?> respondToMatchingRequest(@RequestBody RespondToMatchingRequest request) {
        Long savedTutoringId = matchingService.respondToMatchingRequest(request, memberId);
        return (savedTutoringId != null) ?
            ResponseEntity.created(URI.create(String.format("/tutoring/%s", savedTutoringId))).build()
            : ResponseEntity.ok().body("매칭 요청에 대한 거절이 성공적으로 완료되었습니다.");
    }


}
