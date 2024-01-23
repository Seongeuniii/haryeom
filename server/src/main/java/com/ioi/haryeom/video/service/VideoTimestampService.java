package com.ioi.haryeom.video.service;

import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.VideoTimestamp;
import com.ioi.haryeom.video.dto.VideoTimestampDto;
import com.ioi.haryeom.video.dto.VideoTimestampInterface;
import com.ioi.haryeom.video.repository.VideoTimestampRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VideoTimestampService {

    private final VideoTimestampRepository videoTimestampRepository;
    private final TutoringScheduleRepository tutoringScheduleRepository;
    private final VideoRepository videoRepository;

    public List<VideoTimestampInterface> getTimestampList(Long scheduleId) {
        Long videoId = videoRepository.findByTutoringSchedule_Id(scheduleId).getId();
        List<VideoTimestampInterface> timestampList = videoTimestampRepository.findByVideo_Id(videoId);
        return timestampList;
    }

    @Transactional
    public Long createVideoTimestamp(Long tutoringScheduleId, VideoTimestampDto timestampDto) {
        Video video = videoRepository.findByTutoringSchedule_Id(tutoringScheduleId);
        LocalTime stampTime = parseStampTime(timestampDto.getStampTime());
        VideoTimestamp timestamp = VideoTimestamp.builder()
            .video(video).stampTime(stampTime).content(timestampDto.getContent())
            .build();

        VideoTimestamp savedTimestamp = videoTimestampRepository.save(timestamp);
        return savedTimestamp.getId();
    }

    @Transactional
    public void updateVideoTimestamp(Long id, VideoTimestampDto timestampDto) {
        Optional<VideoTimestamp> optionalTimestamp = videoTimestampRepository.findById(id);
        if (!optionalTimestamp.isPresent()) {
            //exception 날리기
        }
        VideoTimestamp videoTimestamp = optionalTimestamp.get();
        LocalTime stampTime = parseStampTime(timestampDto.getStampTime());
        videoTimestamp.update(stampTime, timestampDto.getContent());

    }

    @Transactional
    public void deleteTimestamp(Long id) {
        videoTimestampRepository.deleteById(id);
    }

    private Video findVideoById(Long videoId) {
        return videoRepository.findById(videoId).get();
    }

    private LocalTime parseStampTime(String inputStampTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime stampTime = LocalTime.parse(inputStampTime, formatter);
        return stampTime;
    }
}
