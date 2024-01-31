package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.video.dto.LessonEnd;
import com.ioi.haryeom.video.dto.LessonStart;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoDetailResponse;
import com.ioi.haryeom.video.service.VideoService;
import java.io.IOException;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/lesson/video")
public class VideoController {

    private final VideoService videoService;

    //수업 시작 클릭
    @PostMapping("/")
    public ResponseEntity<Void> createVideo(@Validated @RequestBody LessonStart lessonStart, @AuthMemberId Long memberId) {
        Long id = videoService.createVideo(lessonStart, memberId);
        return ResponseEntity.created(URI.create("/lesson/" + id)).build();
    }

    @PostMapping(value = "/{videoId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> uploadVideo(@PathVariable Long videoId,
        @RequestPart MultipartFile file, @AuthMemberId Long memberId) throws IOException {
        videoService.videoUploadExceptionTest(videoId, memberId);
        String videoUrl = videoService.uploadVideo(file);
        videoService.updateVideoUrl(videoId, videoUrl);
        return ResponseEntity.created(URI.create("/lesson/video/"+videoId)).build();
    }

    @PatchMapping("/{videoId}")
    public ResponseEntity<Void> endVideo(@PathVariable Long videoId,
        @Validated @RequestBody LessonEnd lessonEnd, @AuthMemberId Long memberId) {
        videoService.updateVideoEndTime(videoId, lessonEnd, memberId);
        return ResponseEntity.noContent().build();
    }
}
