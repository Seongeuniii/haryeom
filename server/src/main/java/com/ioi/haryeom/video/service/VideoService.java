package com.ioi.haryeom.video.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ioi.haryeom.aws.exception.S3UploadException;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.exception.TutoringScheduleNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.exception.DuplicateVideoException;
import com.ioi.haryeom.video.exception.UnauthorizedTeacherAccessException;
import com.ioi.haryeom.video.exception.VideoTutoringNotFoundException;
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

    private final MemberRepository memberRepository;
    private final VideoRepository videoRepository;
    private final TutoringScheduleRepository tutoringScheduleRepository;

    private final AmazonS3 amazonS3;

    private final String cloudFrontUrl = "https://d1b632bso7m0wd.cloudfront.net";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public Long createVideo(Long tutoringScheduleId, Long memberId) {
        LocalTime startTime = LocalTime.now();

        TutoringSchedule tutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId)
            .orElseThrow(() -> new TutoringScheduleNotFoundException(tutoringScheduleId));

        validateTutoringTeacher(memberId, tutoringSchedule);

        if (videoRepository.existsByTutoringSchedule(tutoringSchedule)) {
            throw new DuplicateVideoException(tutoringScheduleId);
        }

        log.info("[CREATE VIDEO] tutoringScheduleId : {}, startTime: {}", tutoringScheduleId, startTime);
        Video video = Video.builder()
            .tutoringSchedule(tutoringSchedule)
            .startTime(startTime)
            .build();
        Video savedVideo = videoRepository.save(video);
        log.info("[CREATE VIDEO] savedVideoId : {}", savedVideo.getId());
        return savedVideo.getId();
    }

    @Transactional
    public void updateVideoEndTime(Long tutoringScheduleId, Long memberId) {

        TutoringSchedule tutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId)
            .orElseThrow(() -> new TutoringScheduleNotFoundException(tutoringScheduleId));

        validateTutoringTeacher(memberId, tutoringSchedule);

        Video video = videoRepository.findByTutoringSchedule(tutoringSchedule)
            .orElseThrow(() -> new VideoTutoringNotFoundException(tutoringScheduleId));
        LocalTime endTime = LocalTime.now();
        video.updateVideoEndTime(endTime);
    }

    @Transactional
    public Long uploadVideo(Long tutoringScheduleId, Long memberId, MultipartFile file) {

        TutoringSchedule tutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId)
            .orElseThrow(() -> new TutoringScheduleNotFoundException(tutoringScheduleId));

        Video video = videoRepository.findByTutoringSchedule(tutoringSchedule)
            .orElseThrow(() -> new VideoTutoringNotFoundException(tutoringScheduleId));

        validateTutoringTeacher(memberId, tutoringSchedule);

        String fileName = randomString();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        try {
            amazonS3.putObject(bucket, "vod/" + fileName + ".webm", file.getInputStream(), metadata);
        } catch (IOException e) {
            throw new S3UploadException();
        }

        String videoUrl = cloudFrontUrl + "/vod/" + fileName + ".webm";

        video.updateVideoUrl(videoUrl);

        return video.getId();
    }

    @Transactional
    public void updateVideoUrl(Long tutoringScheduleId, String videoUrl) {
        Optional<Video> videoOptional = videoRepository.findByTutoringScheduleId(tutoringScheduleId);
        Video video = videoOptional.get(); //Todo: optional check
        video.updateVideoUrl(videoUrl);
    }

    // 영상 삭제: 쓸일 없는데 일단 작성
    @Transactional
    public void deleteVideo(Long videoId) {
        videoRepository.deleteById(videoId);
    }

    private LocalTime parseLocalTime(String stringDateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime localTime = LocalTime.parse(stringDateTime, formatter);
        return localTime;
    }

    private String randomString() {
        return RandomStringUtils.randomAlphanumeric(12);
    }

    private void validateTutoringTeacher(Long memberId, TutoringSchedule tutoringSchedule) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
        Member teacherMember = tutoringSchedule.getTutoring().getTeacher();
        if (!teacherMember.equals(member)) {
            throw new UnauthorizedTeacherAccessException(teacherMember.getId(), member.getId());
        }
    }
}
