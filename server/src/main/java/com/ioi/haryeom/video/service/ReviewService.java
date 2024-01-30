package com.ioi.haryeom.video.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoDetailResponse;
import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoResponse;
import com.ioi.haryeom.video.exception.VideoNotFoundException;
import com.ioi.haryeom.video.repository.ReviewCustomRepositoryImpl;
import com.ioi.haryeom.video.repository.VideoRepository;
import java.util.List;
import java.util.Optional;
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
    private final TutoringRepository tutoringRepository;

    // 학생별 학습자료 리스트 조회
    public List<TextbookResponse> getTextbookListByAssignmentByTutoringByMember(Long memberId){
        //Todo: 목록이 0개일때?
        return reviewCustomRepository.findAllByAssignmentByTutoringByMember(memberId);
    }

    // 학생별 학습자료별 완료 숙제 리스트 조회
    public List<HomeworkResponse> getHomeworkByTextbookByTutoringByMember(Long textbookId, Long memberId, Pageable pageable){
        //Todo: 목록이 0개일때?
        return reviewCustomRepository.findAllByTextbookByTutoringByMember(textbookId, memberId, pageable).getContent();
    }


    //학생별 과목 리스트 조회
    public List<SubjectResponse> getSubjectListByTutoringByMember(Long memberId){
        //Todo: 목록이 0개일때?
        return reviewCustomRepository.findAllByTutoringByMember(memberId);
    }

    //학생별 과목별 영상 리스트 조회 - queryDsl 활용
    public List<VideoResponse> getVideoBySubjectByTutoringByMember(Long subjectId, Long memberId, Pageable pageable){
        //Todo: 목록이 0개일때?
        return reviewCustomRepository.findAllBySubjectAndTutoringServiceByTutoringByMember(subjectId, memberId, pageable).getContent();
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
