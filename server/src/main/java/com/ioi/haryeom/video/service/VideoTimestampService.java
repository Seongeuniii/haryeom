package com.ioi.haryeom.video.service;

import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.VideoTimestamp;
import com.ioi.haryeom.video.dto.VideoTimestampRequest;
import com.ioi.haryeom.video.dto.VideoTimestampResponse;
import com.ioi.haryeom.video.exception.VideoTimestampNotFoundException;
import com.ioi.haryeom.video.repository.VideoTimestampRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    public List<VideoTimestampResponse> getTimestampList(Long scheduleId) {
        //Todo: auth exception
        Long videoId = videoRepository.findByTutoringSchedule_Id(scheduleId).getId();
        List<VideoTimestamp> timestampList = videoTimestampRepository.findByVideo_Id(videoId);
        List<VideoTimestampResponse> videoTimestampResponseList = new ArrayList<>();
        for(VideoTimestamp timestamp: timestampList){
            videoTimestampResponseList.add(new VideoTimestampResponse(timestamp));
        }
        return videoTimestampResponseList;
    }

    @Transactional
    public Long createVideoTimestamp(Long tutoringScheduleId, VideoTimestampRequest timestampRequest) {
        Video video = videoRepository.findByTutoringSchedule_Id(tutoringScheduleId);
        LocalTime stampTime = parseStampTime(timestampRequest.getStampTime());
        VideoTimestamp timestamp = VideoTimestamp.builder()
            .video(video).stampTime(stampTime).content(timestampRequest.getContent())
            .build();

        VideoTimestamp savedTimestamp = videoTimestampRepository.save(timestamp);
        return savedTimestamp.getId();

        //Todo: auth exception
    }

    @Transactional
    public void updateVideoTimestamp(Long id, VideoTimestampRequest timestampRequest) {
        Optional<VideoTimestamp> optionalTimestamp = videoTimestampRepository.findById(id);
        if (!optionalTimestamp.isPresent()) {
            throw new VideoTimestampNotFoundException(id);
        }
        //Todo: auth exception
        VideoTimestamp videoTimestamp = optionalTimestamp.get();
        LocalTime stampTime = parseStampTime(timestampRequest.getStampTime());
        videoTimestamp.update(stampTime, timestampRequest.getContent());
    }

    @Transactional
    public void deleteTimestamp(Long id) {
        //Todo: auth exception
        Optional<VideoTimestamp> deleteVideo = findVideoById(id);
        if(!deleteVideo.isPresent()){
            throw new VideoTimestampNotFoundException(id);
        }
        videoTimestampRepository.delete(deleteVideo.get());
    }

    private Optional<VideoTimestamp> findVideoById(Long videoTimestampId) {
        return videoTimestampRepository.findById(videoTimestampId);
    }

    private LocalTime parseStampTime(String inputStampTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime stampTime = LocalTime.parse(inputStampTime, formatter);
        return stampTime;
    }
}
