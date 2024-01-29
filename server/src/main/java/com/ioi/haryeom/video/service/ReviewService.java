package com.ioi.haryeom.video.service;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoResponse;
import com.ioi.haryeom.video.repository.ReviewCustomRepositoryImpl;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final HomeworkRepository homeworkRepository;
    private final VideoRepository videoRepository;
    private final ReviewCustomRepositoryImpl reviewCustomRepository;

    // 학생별 학습자료 리스트 조회
    public List<TextbookResponse> getTextbookListByAssignmentByTutoringByMember(Long memberId){
        return reviewCustomRepository.findAllByAssignmentByTutoringByMember(memberId);
    }

    // 학생별 학습자료별 완료 숙제 리스트 조회
    public List<HomeworkResponse> getHomeworkByTextbookByTutoringByMember(Long textbookId, Long memberId, Pageable pageable){

        return reviewCustomRepository.findAllByTextbookByTutoringByMember(textbookId, memberId, pageable).getContent();
    }


    //학생별 과목 리스트 조회
    public List<SubjectResponse> getSubjectListByTutoringByMember(Long memberId){
        return reviewCustomRepository.findAllByTutoringByMember(memberId);
    }

    //학생별 과목별 영상 리스트 조회 - queryDsl 활용, 잘 안 되서 일단은 nativequery로..
    public List<VideoResponse> getVideoBySubjectByTutoringByMember(Long subjectId, Long memberId, Pageable pageable){
        return reviewCustomRepository.findAllBySubjectAndTutoringServiceByTutoringByMember(subjectId, memberId, pageable).getContent();
    }
    
    //페이징 미적용상태
//    public List<VideoInterface> getVideoBySubjectByTutoringByMember(Long subjectId, Long memberId, Pageable pageable){
//        return videoRepository.findAllBySubjectId(subjectId, memberId);
//    }


    // 비디오 상세조회
    public VideoDetailInterface getVideoDetail(Long videoId){
        return videoRepository.findVideoById(videoId);
    }
}
