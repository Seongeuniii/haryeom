package com.ioi.haryeom.video.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.dto.LessonEndDto;
import com.ioi.haryeom.video.dto.LessonStartDto;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoListResponseDto;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
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

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public VideoDetailInterface getVideoDetail(Long videoId){
        return videoRepository.findVideoById(videoId);
    }
    public List<VideoListResponseDto> getVideoListBySubject(Integer subjectId) {
        List<VideoInterface> findVideosBySubjectIdList = videoRepository.findAllBySubjectId(subjectId);
        List<VideoListResponseDto> videoList = new ArrayList<>();
        for(int i=0;i<findVideosBySubjectIdList.size();i++){
            VideoInterface videoInterface = findVideosBySubjectIdList.get(i);
            VideoListResponseDto dto = new VideoListResponseDto();
            dto.setVideoId(videoInterface.getId());
            dto.setTitle(videoInterface.getTitle());
            dto.setScheduleDate(videoInterface.getScheduleDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            Duration duration = Duration.between(videoInterface.getStartTime(),videoInterface.getEndTime());
            Long hour = duration.toHours();
            Long minute = duration.toMinutes()%60;
            Long second = duration.toSeconds()%60;
            String stringHour = (hour<10)?"0"+hour:hour.toString();
            String stringMinute = (minute<10)?"0"+minute:minute.toString();
            String stringSecond = (second<10)?"0"+second:second.toString();
            dto.setDuration(stringHour+":"+stringMinute+":"+stringSecond);
            System.out.println(dto.toString());
            videoList.add(dto);
        }
        return videoList;
    }

    @Transactional
    public Long createVideo(LessonStartDto lessonStartDto) {
        LocalTime startTime = parseLocalTime(lessonStartDto.getStartTime());
        TutoringSchedule tutoringSchedule = tutoringScheduleRepository.findById(lessonStartDto.getTutoringScheduleId()).get();
        Video video = Video.builder()
            .tutoringSchedule(tutoringSchedule)
            .startTime(startTime)
            .build();
        Video savedVideo = videoRepository.save(video);
        return savedVideo.getId();
    }

    @Transactional
    public void updateVideoEndTime(Long id, LessonEndDto lessonEndDto) {
        Optional<Video> video = videoRepository.findById(id);
        Video updateVideo = video.get();
        LocalTime endTime = parseLocalTime(lessonEndDto.getEndTime());
        updateVideo.updateVideoEndTime(endTime);
    }

    @Transactional
    public void updateVideoURL(Long id, String videoURL) {
        Optional<Video> video = videoRepository.findById(id);
        Video updateVideo = video.get();
        updateVideo.updateVideoURL(videoURL);
    }

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

        amazonS3Client.putObject(bucket, fileName, uploadFile.getInputStream(), metadata);
        String videoURL = amazonS3Client.getUrl(bucket, fileName).toString();
        return videoURL;
    }
}
