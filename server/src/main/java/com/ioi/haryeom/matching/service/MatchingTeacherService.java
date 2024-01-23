package com.ioi.haryeom.matching.service;

import com.ioi.haryeom.matching.dto.MatchingTeacherRequest;
import com.ioi.haryeom.matching.dto.TeacherResponse;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.repository.TeacherCustomRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class MatchingTeacherService {

    private final TeacherCustomRepository teacherCustomRepository;

    public List<TeacherResponse> getTeacherList(MatchingTeacherRequest request, Pageable pageable) {

        List<Teacher> teachers = teacherCustomRepository.findAllByTeacherConditions(
            request.getSubjectIds(), request.getColleges(), request.getGender(),
            request.getMinCareer(), request.getMaxSalary(), pageable);

        return teachers.stream()
            .map(TeacherResponse::fromTeacher)
            .collect(Collectors.toList());
    }
}
