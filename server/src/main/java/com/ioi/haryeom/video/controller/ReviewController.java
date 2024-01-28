package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoListResponseDto;
import com.ioi.haryeom.video.service.ReviewService;
import java.util.List;

import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.hibernate5.SpringSessionContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    private Long memberId = 2L; // 임시용

    //학생이 수강한 과목 리스트 찾기
    @GetMapping("/homework")
    public ResponseEntity<List<TextbookResponse>> getTextbookByMemberId(){
        return null;
    }

    //학습자료별 숙제 리스트 찾기
    @GetMapping("/homework/{textbookId}")
    public ResponseEntity<List<HomeworkResponse>> getHomeworkByTextbookId(@PathVariable Long textbookId){
//        Member member = (Member) authentication.getPrincipal();
        //ToDo: authentication 적용해서 memberId 구하기
        return ResponseEntity.ok(reviewService.getHomeworkListByTextbook(textbookId, memberId));
    }

    //학생이 수강한 과목 리스트 찾기
    @GetMapping("/homework")
    public ResponseEntity<List<SubjectResponse>> getSubjectByMemberId(){
        return null;
    }

    // 과목별 비디오 리스트 찾기
    @GetMapping("/video/{subjectId}")
    public ResponseEntity<List<VideoListResponseDto>> getVideoListBySubject(@PathVariable Long subjectId, Authentication authentication){
//        Member member = (Member) authentication.getPrincipal();
        //ToDo: authentication 적용해서 memberId 구하기
        return ResponseEntity.ok(reviewService.getVideoListBySubject(subjectId, memberId));
    }

    // 영상 상세 정보 보기
    @GetMapping("/video/detail/{videoId}")
    public ResponseEntity<VideoDetailInterface> getVideoDetail(@PathVariable Long videoId){
        return ResponseEntity.ok(reviewService.getVideoDetail(videoId));
    }
}
