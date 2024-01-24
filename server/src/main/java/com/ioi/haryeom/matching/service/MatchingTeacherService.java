package com.ioi.haryeom.matching.service;

import com.ioi.haryeom.matching.dto.MatchingTeacherRequest;
import com.ioi.haryeom.matching.dto.TeacherDetailResponse;
import com.ioi.haryeom.matching.dto.TeacherResponse;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.domain.TeacherSubject;
import com.ioi.haryeom.member.exception.TeacherNotFoundException;
import com.ioi.haryeom.member.repository.TeacherCustomRepository;
import com.ioi.haryeom.member.repository.TeacherRepository;
import com.ioi.haryeom.member.repository.TeacherSubjectRepository;
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

    private final TeacherRepository teacherRepository;
    private final TeacherCustomRepository teacherCustomRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;


    public List<TeacherResponse> getTeacherList(MatchingTeacherRequest request, Pageable pageable) {

        List<Teacher> teachers = teacherCustomRepository.findAllByTeacherConditions(
            request.getSubjectIds(), request.getColleges(), request.getGender(),
            request.getMinCareer(), request.getMaxSalary(), pageable);

        return teachers.stream()
            .map(TeacherResponse::from)
            .collect(Collectors.toList());
    }


    public TeacherDetailResponse getTeacher(Long teacherId) {

        Teacher teacher = teacherRepository.findById(teacherId)
            .orElseThrow(() -> new TeacherNotFoundException(teacherId));

        List<TeacherSubject> teacherSubjects = teacherSubjectRepository.findByTeacherId(teacher.getId());

        return TeacherDetailResponse.from(teacher, teacherSubjects);
    }
}
