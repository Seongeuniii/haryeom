package com.ioi.haryeom.matching.controller;


import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.matching.dto.CreateMatchingRequest;
import com.ioi.haryeom.matching.dto.EndTutoringRequest;
import com.ioi.haryeom.matching.dto.RespondToMatchingRequest;
import com.ioi.haryeom.matching.service.MatchingService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    private final MatchingService matchingService;

    // 과외 매칭 요청
    @PostMapping("/request")
    public ResponseEntity<Void> createMatchingRequest(@RequestBody @Validated CreateMatchingRequest request, @AuthMemberId Long memberId) {
        String matchingId = matchingService.createMatchingRequest(request, memberId);
        log.info("CONTROLLER REQUEST mathincId {}", matchingId);
        return ResponseEntity.created(URI.create(String.format("/matching/%s", matchingId))).build();
    }

    // 과외 매칭 응답
    @PostMapping("/response")
    public ResponseEntity<?> respondToMatchingRequest(@RequestBody @Validated RespondToMatchingRequest request, @AuthMemberId Long memberId) {
        log.info("mathincgID : {}", request.getMatchingId());
        Long savedTutoringId = matchingService.respondToMatchingRequest(request, memberId);
        return (savedTutoringId != null) ?
            ResponseEntity.created(URI.create(String.format("/tutoring/%s", savedTutoringId))).build()
            : ResponseEntity.ok().body("매칭 요청에 대한 거절이 성공적으로 완료되었습니다.");
    }

    // 과외 종료
    @DeleteMapping("/end")
    public ResponseEntity<Void> endTutoring(@RequestBody @Validated EndTutoringRequest request, @AuthMemberId Long memberId) {
        matchingService.endTutoring(request.getTutoringId(), memberId);
        return ResponseEntity.noContent().build();
    }
}
