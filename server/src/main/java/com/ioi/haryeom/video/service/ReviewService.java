package com.ioi.haryeom.video.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.domain.VideoTimestamp;
import com.ioi.haryeom.video.dto.HomeworkReviewListResponse;
import com.ioi.haryeom.video.dto.VideoDetailResponse;
import com.ioi.haryeom.video.dto.VideoResponse;
import com.ioi.haryeom.video.dto.VideoReviewListResponse;
import com.ioi.haryeom.video.exception.VideoNotFoundException;
import com.ioi.haryeom.video.repository.ReviewCustomRepositoryImpl;
import com.ioi.haryeom.video.repository.VideoRepository;
import com.ioi.haryeom.video.repository.VideoTimestampRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final MemberRepository memberRepository;
    private final HomeworkRepository homeworkRepository;
    private final VideoRepository videoRepository;
    private final ReviewCustomRepositoryImpl reviewCustomRepository;
    private final TutoringRepository tutoringRepository;
    private final VideoTimestampRepository videoTimestampRepository;

    // 학생별 학습자료 리스트 조회
    public List<TextbookResponse> getTextbookListByAssignmentByTutoringByMember(Long memberId) {
        //Todo: 목록이 0개일때?
        return reviewCustomRepository.findAllByAssignmentByTutoringByMember(memberId);
    }

    // 학생별 학습자료별 완료 숙제 리스트 조회
    public HomeworkReviewListResponse getHomeworkByTextbookByTutoringByMember(Long textbookId, Long memberId, Pageable pageable) {
        //Todo: 목록이 0개일때?
        Page<HomeworkResponse> response = reviewCustomRepository.findAllByTextbookByTutoringByMember(textbookId, memberId, pageable);
        HomeworkReviewListResponse homeworkReviewListResponse = new HomeworkReviewListResponse(response.getContent(), response.getTotalPages());
        return homeworkReviewListResponse;
    }


    //학생별 과목 리스트 조회
    public List<SubjectResponse> getSubjectListByTutoringByMember(Long memberId) {
        //Todo: 목록이 0개일때?
        return reviewCustomRepository.findAllByTutoringByMember(memberId);
    }

    //학생별 과목별 영상 리스트 조회 - queryDsl 활용
    public VideoReviewListResponse getVideoBySubjectByTutoringByMember(Long tutoringId, Long memberId, Pageable pageable) {
        //Todo: 목록이 0개일때?
        Page<VideoResponse> response = reviewCustomRepository.findAllByTutoringIdByMemberId(tutoringId, memberId, pageable);
        VideoReviewListResponse videoReviewListResponse = new VideoReviewListResponse(response.getContent(), response.getTotalPages());
        return videoReviewListResponse;
    }

    // 비디오 상세조회
    public VideoDetailResponse getVideoDetail(Long memberId, Long videoId) {

        Video video = videoRepository.findById(videoId).orElseThrow(() -> new VideoNotFoundException(videoId));
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        TutoringSchedule tutoringSchedule = video.getTutoringSchedule();
        Tutoring tutoring = tutoringSchedule.getTutoring();
        if (!tutoring.isMemberPartOfTutoring(member)) {
            throw new AuthorizationException(member.getId());
        }

        Subject subject = tutoring.getSubject();
        Member teacherMember = tutoring.getTeacher();

        List<VideoTimestamp> videoTimestampList = videoTimestampRepository.findAllByVideo(video);

//        List<VideoTimestampResponse> videoTimestampResponses = new ArrayList<>();
//        for (VideoTimestamp timestamp : videoTimestampList) {
//            videoTimestampResponses.add(new VideoTimestampResponse(timestamp));
//        }
        return new VideoDetailResponse(video, tutoringSchedule, teacherMember, videoTimestampList, subject);
    }
}
