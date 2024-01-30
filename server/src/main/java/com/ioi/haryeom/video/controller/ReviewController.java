package com.ioi.haryeom.video.controller;

import static org.springframework.data.domain.Sort.Direction.DESC;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoDetailResponse;
import com.ioi.haryeom.video.dto.VideoResponse;
import com.ioi.haryeom.video.service.ReviewService;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    //학생이 수강한 과외의 학습자료 리스트 찾기 - ok
    @GetMapping("/homework")
    public ResponseEntity<List<TextbookResponse>> getTextbookByMemberId(@AuthMemberId Long memberId){
        return ResponseEntity.ok(reviewService.getTextbookListByAssignmentByTutoringByMember(memberId));
    }

    //학습자료별 숙제 리스트 찾기, 페이징 필요
    @GetMapping("/homework/{textbookId}")
    public ResponseEntity<List<HomeworkResponse>> getHomeworkByTextbookId(@AuthMemberId Long memberId, @PathVariable Long textbookId, @PageableDefault(size = 10, sort = "deadline", direction = DESC) Pageable pageable){
        return ResponseEntity.ok(reviewService.getHomeworkByTextbookByTutoringByMember(textbookId, memberId, pageable));
    }

    //학생이 수강한 과목 리스트 찾기 - ok
    @GetMapping("/video")
    public ResponseEntity<List<SubjectResponse>> getSubjectByMemberId(@AuthMemberId Long memberId){
        return ResponseEntity.ok(reviewService.getSubjectListByTutoringByMember(memberId));
    }

    // 과목별 비디오 리스트 찾기 -- 일단 성?공
    @GetMapping("/video/{subjectId}")
    public ResponseEntity<List<VideoResponse>> getVideoListBySubject(@AuthMemberId Long memberId, @PathVariable Long subjectId, @PageableDefault(size = 10, sort = "createdAt", direction = DESC) Pageable pageable){
        return ResponseEntity.ok(reviewService.getVideoBySubjectByTutoringByMember(subjectId, memberId, pageable));
    }

    // 영상 상세 정보 보기
    @GetMapping("/video/detail/{videoId}")
    public ResponseEntity<VideoDetailResponse> getVideoDetail(@AuthMemberId Long memberId, @PathVariable Long videoId){
        //Todo: 예외처리: 영상이 존재하는지 / 권한이 있는 사용자인지 (video의 tutoringschedule의 tutoring의 studentmemberid가 동일한지)
        return ResponseEntity.ok(reviewService.getVideoDetail(memberId, videoId));
    }
}
