package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.video.dto.VideoInterface;
import com.ioi.haryeom.video.dto.VideoListResponseDto;

import java.util.List;

public interface VideoCustomRepository {
    List<VideoListResponseDto> findAllBySubjectIdAndMemberId(Long subjectId, Long memberId);
}
