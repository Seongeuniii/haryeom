package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.video.service.VideoService;
import java.io.IOException;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/lesson/video")
public class VideoController {

    private final VideoService videoService;

    //수업 시작 클릭
    @PostMapping("/{tutoringScheduleId}")
    public ResponseEntity<Void> createVideo(@PathVariable Long tutoringScheduleId, @AuthMemberId Long memberId) {
        Long videoId = videoService.createVideo(tutoringScheduleId, memberId);
        return ResponseEntity.created(URI.create("/lesson/" + videoId)).build();
    }

    @PostMapping(value = "/upload/{tutoringScheduleId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> uploadVideo(@PathVariable Long tutoringScheduleId,
        @RequestPart MultipartFile file, @AuthMemberId Long memberId) throws IOException {
        Long videoId = videoService.videoUploadExceptionTest(tutoringScheduleId, memberId);
        String videoUrl = videoService.uploadVideo(file);
        videoService.updateVideoUrl(tutoringScheduleId, videoUrl);
        return ResponseEntity.created(URI.create("/lesson/video/" + videoId)).build();
    }

    @PutMapping("/{tutoringScheduleId}")
    public ResponseEntity<Void> endVideo(@PathVariable Long tutoringScheduleId, @AuthMemberId Long memberId) {
        videoService.updateVideoEndTime(tutoringScheduleId, memberId);
        return ResponseEntity.noContent().build();
    }
}
