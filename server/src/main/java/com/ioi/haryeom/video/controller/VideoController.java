package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.video.dto.LessonEndDto;
import com.ioi.haryeom.video.dto.LessonStartDto;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.service.VideoService;
import java.io.IOException;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
    public ResponseEntity<Void> createVideo(@RequestBody LessonStartDto lessonStartDto) {
        Long id = videoService.createVideo(lessonStartDto);
        return ResponseEntity.created(URI.create("/video/" + id)).build();
    }

    @PostMapping(value = "/{videoId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Void> uploadVideo(@PathVariable Long videoId,
        @RequestPart MultipartFile uploadFile) throws IOException {

        String videoURL = videoService.uploadVideo(uploadFile);
        videoService.updateVideoURL(videoId, videoURL);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{videoId}")
    public ResponseEntity<Void> endVideo(@PathVariable Long videoId,
        @RequestBody LessonEndDto lessonEndDto) {
        videoService.updateVideoEndTime(videoId, lessonEndDto);
        return ResponseEntity.noContent().build();
    }

    // 방 상세 정보 보기
    @GetMapping("/detail/{videoId}")
    public ResponseEntity<VideoDetailInterface> getVideoDetail(@PathVariable Long videoId){
        return ResponseEntity.ok(videoService.getVideoDetail(videoId));
    }
}
