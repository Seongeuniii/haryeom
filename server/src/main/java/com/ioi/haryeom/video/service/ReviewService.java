package com.ioi.haryeom.video.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.dto.*;
import com.ioi.haryeom.video.exception.VideoNotFoundException;
import com.ioi.haryeom.video.repository.ReviewCustomRepositoryImpl;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final HomeworkRepository homeworkRepository;
    private final VideoRepository videoRepository;
    private final ReviewCustomRepositoryImpl reviewCustomRepository;
    private final TutoringRepository tutoringRepository;

    // 학생별 학습자료 리스트 조회
    public List<TextbookResponse> getTextbookListByAssignmentByTutoringByMember(Long memberId){
        //Todo: 목록이 0개일때?
        return reviewCustomRepository.findAllByAssignmentByTutoringByMember(memberId);
    }

    // 학생별 학습자료별 완료 숙제 리스트 조회
    public HomeworkReviewListResponse getHomeworkByTextbookByTutoringByMember(Long textbookId, Long memberId, Pageable pageable){
        //Todo: 목록이 0개일때?
        Page<HomeworkResponse> response = reviewCustomRepository.findAllByTextbookByTutoringByMember(textbookId, memberId, pageable);
        HomeworkReviewListResponse homeworkReviewListResponse = new HomeworkReviewListResponse(response.getContent(), response.getTotalPages());
        return homeworkReviewListResponse;
    }


    //학생별 과목 리스트 조회
    public List<SubjectResponse> getSubjectListByTutoringByMember(Long memberId){
        //Todo: 목록이 0개일때?
        return reviewCustomRepository.findAllByTutoringByMember(memberId);
    }

    //학생별 과목별 영상 리스트 조회 - queryDsl 활용
    public VideoReviewListResponse getVideoBySubjectByTutoringByMember(Long subjectId, Long memberId, Pageable pageable){
        //Todo: 목록이 0개일때?
        Page<VideoResponse> response = reviewCustomRepository.findAllBySubjectAndTutoringServiceByTutoringByMember(subjectId, memberId, pageable);
        VideoReviewListResponse videoReviewListResponse = new VideoReviewListResponse(response.getContent(), response.getTotalPages());
        return videoReviewListResponse;
    }

    // 비디오 상세조회
    public VideoDetailResponse getVideoDetail(Long memberId, Long videoId){
        Optional<Video> videoOptional=videoRepository.findById(videoId);
        if(!videoOptional.isPresent()){
            throw new VideoNotFoundException(videoId);
        }
        Video video = videoRepository.findById(videoId).get();
        Long studentId = video.getTutoringSchedule().getTutoring().getStudent().getId();
        if(memberId!=studentId){
            throw new AuthorizationException(memberId);
        }
        return new VideoDetailResponse(video);
    }
}
