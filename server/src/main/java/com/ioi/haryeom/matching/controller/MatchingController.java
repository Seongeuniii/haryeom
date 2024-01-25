package com.ioi.haryeom.matching.controller;


import com.ioi.haryeom.matching.dto.CreateMatchingRequest;
import com.ioi.haryeom.matching.service.MatchingService;
import java.net.URI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    private MatchingService matchingService;
    private Long memberId = 2L;


    // 과외 매칭 요청
    @PostMapping("/request")
    public ResponseEntity<String> createMatchingRequest(@RequestBody CreateMatchingRequest request) {

        String matchingId = matchingService.createMatchingService(request, memberId);

        // 생성된 matchingId 반환
        return ResponseEntity.created(URI.create("/matching/" + matchingId)).build();
    }

}
