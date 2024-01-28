package com.ioi.haryeom.video.service;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoListResponseDto;
import com.ioi.haryeom.video.repository.VideoCustomRepositoryImpl;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.util.List;
import java.util.stream.Collectors;

import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final HomeworkRepository homeworkRepository;
    private final VideoRepository videoRepository;
    private final VideoCustomRepositoryImpl videoCustomRepository;

    private List<VideoListResponseDto> response;
    // 비디오 상세조회
    public VideoDetailInterface getVideoDetail(Long videoId){
        return videoRepository.findVideoById(videoId);
    }

    //과목별 비디오 리스트 조회
    public List<VideoListResponseDto> getVideoListBySubject(Long subjectId, Long memberId) {
        List<VideoListResponseDto> findVideosBySubjectIdList = videoCustomRepository.findAllBySubjectIdAndMemberId(subjectId, memberId);
        return findVideosBySubjectIdList;
    }

    // 학습자료별 완료 숙제 리스트 조회
    public List<HomeworkResponse> getHomeworkListByTextbook(Long textbookId, Long memberId){

        List<Homework> homeworkListByTextbook = homeworkRepository.findAllByTextbookIdAndStatus(textbookId, HomeworkStatus.COMPLETED);
        List<HomeworkResponse> homeworkResponses = homeworkListByTextbook
            .stream()
            .map(HomeworkResponse::new)
            .collect(Collectors.toList());

        return homeworkResponses;
    }
}
