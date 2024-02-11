package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.video.domain.VideoTimestamp;
import com.ioi.haryeom.video.dto.VideoTimestampRequest;
import com.ioi.haryeom.video.dto.VideoTimestampResponse;
import com.ioi.haryeom.video.repository.VideoTimestampRepository;
import com.ioi.haryeom.video.service.VideoTimestampService;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/lesson/timestamp")
public class VideoTimestampController {

    private final VideoTimestampService videoTimestampService;
    private final VideoTimestampRepository videoTimestampRepository;
    
    @GetMapping("/{tutoringScheduleId}")
    public ResponseEntity<List<VideoTimestampResponse>> getTimestampList(@PathVariable Long tutoringScheduleId, @AuthMemberId Long memberId) {
        List<VideoTimestampResponse> timestampList = videoTimestampService.getTimestampList(tutoringScheduleId, memberId);
        return ResponseEntity.ok(timestampList);
    }

    @PostMapping("/{tutoringScheduleId}")
    public ResponseEntity<Void> createTimestamp(@Validated @RequestBody VideoTimestampRequest timestampRequest,
        @PathVariable Long tutoringScheduleId, @AuthMemberId Long memberId) {
        Long timestampId = videoTimestampService.createVideoTimestamp(tutoringScheduleId, timestampRequest, memberId);
        return ResponseEntity.created(URI.create("/timestamp/" + timestampId)).build();
    }

    @PutMapping("/{videoId}")
    public ResponseEntity<Void> updateTimestamp(@Validated @RequestBody VideoTimestampRequest timestampRequest,
        @PathVariable Long videoId, @AuthMemberId Long memberId) {
        videoTimestampService.updateVideoTimestamp(videoId, timestampRequest, memberId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<Void> deleteTimestamp(@PathVariable Long videoId, @AuthMemberId Long memberId) {
        videoTimestampService.deleteTimestamp(videoId, memberId);
        return ResponseEntity.noContent().build();
    }
}
