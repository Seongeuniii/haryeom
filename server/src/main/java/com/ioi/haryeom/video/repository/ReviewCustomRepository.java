package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.video.dto.VideoResponse;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewCustomRepository {
    // 학생별 학습자료 리스트 조회
    List<TextbookResponse> findAllByAssignmentByTutoringByMember(Long memberId);

    //학생별 학습자료별 완료 숙제 리스트 조회
    Page<HomeworkResponse> findAllByTextbookByTutoringByMember(Long textbookId, Long memberId, Pageable pageable);
    // 학생별 과목 리스트 조회
    List<SubjectResponse> findAllByTutoringByMember(Long memberId);
    //학생별 과목별 영상 리스트 조회
    Page<VideoResponse> findAllBySubjectAndTutoringServiceByTutoringByMember(Long subjectId, Long memberId, Pageable pageable);

}
