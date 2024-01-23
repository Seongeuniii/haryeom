package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoListResponseDto;
import com.ioi.haryeom.video.service.ReviewService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/homework/{textbookId}")
    public ResponseEntity<List<HomeworkResponse>> getHomeworkByTextbookId(@PathVariable Long textbookId){
        return ResponseEntity.ok(reviewService.getHomeworkListByTextbook(textbookId));
    }

    // 과목별 비디오 리스트 찾기
    @GetMapping("/video/{subjectId}")
    public ResponseEntity<List<VideoListResponseDto>> getVideoListBySubject(@PathVariable Integer subjectId){
        return ResponseEntity.ok(reviewService.getVideoListBySubject(subjectId));
    }

    // 방 상세 정보 보기
    @GetMapping("/video/detail/{videoId}")
    public ResponseEntity<VideoDetailInterface> getVideoDetail(@PathVariable Long videoId){
        return ResponseEntity.ok(reviewService.getVideoDetail(videoId));
    }
}
