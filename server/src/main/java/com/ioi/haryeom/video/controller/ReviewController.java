package com.ioi.haryeom.video.controller;

import static org.springframework.data.domain.Sort.Direction.DESC;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoResponse;
import com.ioi.haryeom.video.service.ReviewService;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

    private Long memberId = 2L; // 임시용 - 학생 멤버아이디 3: 2번과외, 2: 1번과외

    //학생이 수강한 과외의 학습자료 리스트 찾기 - ok
    @GetMapping("/homework")
    public ResponseEntity<List<TextbookResponse>> getTextbookByMemberId(){
        //Member member = (Member) authentication.getPrincipal();
        //Todo: authentication 적용해서 memberId 구하기
        return ResponseEntity.ok(reviewService.getTextbookListByAssignmentByTutoringByMember(memberId));
    }

    //학습자료별 숙제 리스트 찾기, 페이징 필요
    @GetMapping("/homework/{textbookId}")
    public ResponseEntity<List<HomeworkResponse>> getHomeworkByTextbookId(@PathVariable Long textbookId, @PageableDefault(size = 10, sort = "deadline", direction = DESC) Pageable pageable){
//        Member member = (Member) authentication.getPrincipal();
        //Todo: authentication 적용해서 memberId 구하기
        return ResponseEntity.ok(reviewService.getHomeworkByTextbookByTutoringByMember(textbookId, memberId, pageable));
    }

    //학생이 수강한 과목 리스트 찾기 - ok
    @GetMapping("/video")
    public ResponseEntity<List<SubjectResponse>> getSubjectByMemberId(){
        //Todo: authentication 적용해서 memberId 구하기
        return ResponseEntity.ok(reviewService.getSubjectListByTutoringByMember(memberId));
    }

    // 과목별 비디오 리스트 찾기 -- 일단 nativequery로..
    @GetMapping("/video/{subjectId}")
    public ResponseEntity<List<VideoResponse>> getVideoListBySubject(@PathVariable Long subjectId, @PageableDefault(size = 10, sort = "createdAt", direction = DESC) Pageable pageable){
//        Member member = (Member) authentication.getPrincipal();
        //Todo: authentication 적용해서 memberId 구하기
        return ResponseEntity.ok(reviewService.getVideoBySubjectByTutoringByMember(subjectId, memberId, pageable));
    }

    // 영상 상세 정보 보기
    @GetMapping("/video/detail/{videoId}")
    public ResponseEntity<VideoDetailInterface> getVideoDetail(@PathVariable Long videoId){
        return ResponseEntity.ok(reviewService.getVideoDetail(videoId));
    }
}
