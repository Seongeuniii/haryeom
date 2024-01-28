package com.ioi.haryeom.homework.repository;

import com.ioi.haryeom.homework.domain.Homework;

import java.util.List;

public interface HomeworkCustomRepository {
    List<Homework> findHomeworkListBySubjectIdAndMemberId(Long subjectId, Long memberId);
}
