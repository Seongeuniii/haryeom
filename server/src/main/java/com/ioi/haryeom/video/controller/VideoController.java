package com.ioi.haryeom.video.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.dto.LessonEndDto;
import com.ioi.haryeom.video.dto.LessonStartDto;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoListResponseDto;
import com.ioi.haryeom.video.service.VideoService;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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
//        String uploadName = "C:\\Users\\SSAFY\\uploadTest\\test-" + videoId + ".webm";
//        File saveFile = new File(uploadName);
//        try {
//            uploadFile.transferTo(saveFile);
//        } catch (Exception e) {
//
//        }
//        videoService.updateVideoURL(videoId, uploadName);
//        return ResponseEntity.created(URI.create("/video/upload/" + videoId)).build();
    }

    @PatchMapping("/{videoId}")
    public ResponseEntity<Void> endVideo(@PathVariable Long videoId,
        @RequestBody LessonEndDto lessonEndDto) {
        videoService.updateVideoEndTime(videoId, lessonEndDto);
        return ResponseEntity.noContent().build();
    }

    // 과목별 비디오 리스트 찾기
    @GetMapping("/{subjectId}")
    public ResponseEntity<List<VideoListResponseDto>> getVideoListBySubject(@PathVariable Integer subjectId){
        return ResponseEntity.ok(videoService.getVideoListBySubject(subjectId));
    }

    // 방 상세 정보 보기
    @GetMapping("/detail/{videoId}")
    public ResponseEntity<VideoDetailInterface> getVideoDetail(@PathVariable Long videoId){
        return ResponseEntity.ok(videoService.getVideoDetail(videoId));
    }
}
