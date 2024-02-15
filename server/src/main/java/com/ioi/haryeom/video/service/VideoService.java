package com.ioi.haryeom.video.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.exception.TutoringScheduleNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.exception.DuplicateVideoException;
import com.ioi.haryeom.video.exception.UnauthorizedTeacherAccessException;
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

        Video video = videoRepository.findByTutoringSchedule(tutoringSchedule).orElseThrow(VideoNotFoundException::new);
        LocalTime endTime = LocalTime.now();
        video.updateVideoEndTime(endTime);
    }

    public String uploadVideo(MultipartFile file) throws IOException {
        String fileName = randomString();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        amazonS3.putObject(bucket, "vod/" + fileName + ".webm", file.getInputStream(), metadata);
        String videoUrl = cloudFrontUrl + "/vod/" + fileName + ".webm";
        return videoUrl;
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

    public Long videoUploadExceptionTest(Long tutoringScheduleId, Long memberId) {
        Optional<Video> videoOptional = videoRepository.findByTutoringScheduleId(tutoringScheduleId);
        if (!videoOptional.isPresent()) {
            throw new VideoNotFoundException(tutoringScheduleId); //Todo: VideoNotFoundException 수정
        }
        Video video = videoOptional.get();
        if (video.getTutoringSchedule().getTutoring().getTeacher().getId() != memberId) {
            throw new AuthorizationException(memberId);
        }
        return video.getId();
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
