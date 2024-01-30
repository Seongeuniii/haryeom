package com.ioi.haryeom.video.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.dto.LessonEnd;
import com.ioi.haryeom.video.dto.LessonStart;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoDetailResponse;
import com.ioi.haryeom.video.exception.VideoNotFoundException;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final TutoringScheduleRepository tutoringScheduleRepository;

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public Long createVideo(LessonStart lessonStart) {
        LocalTime startTime = parseLocalTime(lessonStart.getStartTime());
        TutoringSchedule tutoringSchedule = tutoringScheduleRepository.findById(lessonStart.getTutoringScheduleId()).get();
        Video video = Video.builder()
            .tutoringSchedule(tutoringSchedule)
            .startTime(startTime)
            .build();
        Video savedVideo = videoRepository.save(video);
        return savedVideo.getId();
    }

    @Transactional
    public void updateVideoEndTime(Long id, LessonEnd lessonEnd) {
        Optional<Video> video = videoRepository.findById(id);
        if(!video.isPresent()){
            throw new VideoNotFoundException(id);
        }
        Video updateVideo = video.get();
        LocalTime endTime = parseLocalTime(lessonEnd.getEndTime());
        updateVideo.updateVideoEndTime(endTime);
    }

    @Transactional
    public void updateVideoURL(Long id, String videoURL) {
        Optional<Video> video = videoRepository.findById(id);
        Video updateVideo = video.get();
        updateVideo.updateVideoURL(videoURL);
    }

    // 영상 삭제: 그런건 없다
    @Transactional
    public void deleteVideo(Long id) {
        videoRepository.deleteById(id);
    }

    private LocalTime parseLocalTime(String stringDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime localTime = LocalTime.parse(stringDateTime, formatter);
        return localTime;
    }

    public String uploadVideo(MultipartFile uploadFile) throws IOException {
        String fileName = uploadFile.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(uploadFile.getSize());
        metadata.setContentType(uploadFile.getContentType());

        amazonS3.putObject(bucket, fileName, uploadFile.getInputStream(), metadata);
        String videoUrl = amazonS3.getUrl(bucket, fileName).toString();
        return videoUrl;
    }
}
