package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.video.domain.VideoTimestamp;
import com.ioi.haryeom.video.dto.VideoTimestampDto;
import com.ioi.haryeom.video.dto.VideoTimestampInterface;
import com.ioi.haryeom.video.repository.VideoTimestampRepository;
import com.ioi.haryeom.video.service.VideoTimestampService;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
    
    @GetMapping("/{scheduleId}")
    public ResponseEntity<List<VideoTimestampInterface>> getTimestampList(@PathVariable Long scheduleId) {
        List<VideoTimestampInterface> timestampList = videoTimestampService.getTimestampList(scheduleId);
        return ResponseEntity.ok(timestampList);
    }

    @PostMapping("/{scheduleId}")
    public ResponseEntity<Void> createTimestamp(@RequestBody VideoTimestampDto timestampDto,
        @PathVariable Long scheduleId) {
        Long timestampId = videoTimestampService.createVideoTimestamp(scheduleId, timestampDto);
        return ResponseEntity.created(URI.create("/timestamp/" + timestampId)).build();
    }

    @PutMapping("/{videoId}")
    public ResponseEntity<Void> updateTimestamp(@RequestBody VideoTimestampDto timestampDto,
        @PathVariable Long videoId) {
        videoTimestampService.updateVideoTimestamp(videoId, timestampDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{videoId}")
    public ResponseEntity<Void> deleteTimestamp(@PathVariable Long videoId) {
        videoTimestampService.deleteTimestamp(videoId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/test/{id}")
    public ResponseEntity<VideoTimestamp> getVideoTimestampListTest(@PathVariable Long id){
        return ResponseEntity.ok(videoTimestampRepository.findById(id).get());
    }
}
