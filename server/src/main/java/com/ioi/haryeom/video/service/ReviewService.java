package com.ioi.haryeom.video.service;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoListResponseDto;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final HomeworkRepository homeworkRepository;
    private final VideoRepository videoRepository;

    // 비디오 상세조회
    public VideoDetailInterface getVideoDetail(Long videoId){
        return videoRepository.findVideoById(videoId);
    }

    //과목별 비디오 리스트 조회
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

    // 학습자료별 완료 숙제 리스트 조회
    public List<HomeworkResponse> getHomeworkListByTextbook(Long textbookId){
        List<Homework> homeworkListByTextbook = homeworkRepository.findAllByTextbookIdAndStatus(textbookId, HomeworkStatus.COMPLETED);

        List<HomeworkResponse> homeworkResponses = homeworkListByTextbook
            .stream()
            .map(HomeworkResponse::new)
            .collect(Collectors.toList());

        return homeworkResponses;
    }
}
