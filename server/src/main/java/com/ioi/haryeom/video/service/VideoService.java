package com.ioi.haryeom.video.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.exception.TutoringScheduleNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.exception.VideoExistException;
import com.ioi.haryeom.video.exception.VideoNotFoundException;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.io.IOException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoService {

    private final VideoRepository videoRepository;
    private final TutoringScheduleRepository tutoringScheduleRepository;

    private final AmazonS3 amazonS3;

    private final String cloudFrontUrl = "https://d1b632bso7m0wd.cloudfront.net";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public Long createVideo(Long tutoringScheduleId, Long memberId) {
        LocalTime startTime = LocalTime.now();
        Optional<TutoringSchedule> optionalTutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId);
        if(!optionalTutoringSchedule.isPresent()){
            throw new TutoringScheduleNotFoundException(tutoringScheduleId);
        }
        TutoringSchedule tutoringSchedule = optionalTutoringSchedule.get();
        if(tutoringSchedule.getTutoring().getTeacher().getId()!=memberId){
            throw new AuthorizationException(memberId);
        }
        Optional<Video> optionalVideo = videoRepository.findByTutoringSchedule_Id(tutoringScheduleId);
        if(optionalVideo.isPresent()){
            throw new VideoExistException(tutoringScheduleId);
        }
        log.info("Before create video - tutoringScheduleId : {}, startTime: {}", tutoringScheduleId, startTime);
        Video video = Video.builder()
            .tutoringSchedule(tutoringSchedule)
            .startTime(startTime)
            .build();
        Video savedVideo = videoRepository.save(video);
        log.info("Video saved - videoId : {}", savedVideo.getId());
        return savedVideo.getId();
    }

    @Transactional
    public void updateVideoEndTime(Long tutoringScheduleId, Long memberId) {
        Optional<TutoringSchedule> optionalTutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId);
        if(!optionalTutoringSchedule.isPresent()){
            throw new TutoringScheduleNotFoundException(tutoringScheduleId);
        }
        TutoringSchedule tutoringSchedule = optionalTutoringSchedule.get();
        if(tutoringSchedule.getTutoring().getTeacher().getId()!=memberId){
            throw new AuthorizationException(memberId);
        }
        Optional<Video> video = videoRepository.findByTutoringSchedule_Id(tutoringScheduleId);
        Video updateVideo = video.get();
        LocalTime endTime = LocalTime.now();
        updateVideo.updateVideoEndTime(endTime);
    }
    public String uploadVideo(MultipartFile file) throws IOException {
        String fileName = randomString();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        amazonS3.putObject(bucket, "vod/"+ fileName+".webm", file.getInputStream(), metadata);
        String videoUrl = cloudFrontUrl + "/vod/" + fileName + "/" + fileName + ".m3u8";
        return videoUrl;
    }
    @Transactional
    public void updateVideoUrl(Long tutoringScheduleId, String videoUrl) {
        Optional<Video> videoOptional = videoRepository.findByTutoringSchedule_Id(tutoringScheduleId);
        Video video = videoOptional.get(); //Todo: optional check
        video.updateVideoUrl(videoUrl);
    }

    // 영상 삭제: 쓸일 없는데 일단 작성
    @Transactional
    public void deleteVideo(Long videoId) {
        videoRepository.deleteById(videoId);
    }

    public Long videoUploadExceptionTest(Long tutoringScheduleId, Long memberId){
        Optional<Video> videoOptional = videoRepository.findByTutoringSchedule_Id(tutoringScheduleId);
        if(!videoOptional.isPresent()){
            throw new VideoNotFoundException(tutoringScheduleId); //Todo: VideoNotFoundException 수정
        }
        Video video = videoOptional.get();
        if(video.getTutoringSchedule().getTutoring().getTeacher().getId()!=memberId){
            throw new AuthorizationException(memberId);
        }
        return video.getId();
    }

    private LocalTime parseLocalTime(String stringDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime localTime = LocalTime.parse(stringDateTime, formatter);
        return localTime;
    }

    private String randomString(){
        return RandomStringUtils.randomAlphanumeric(12);
    }
}
