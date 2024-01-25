package com.ioi.haryeom.tutoring.service;

import com.ioi.haryeom.advice.exception.UnauthorizedException;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.type.Role;
import com.ioi.haryeom.member.exception.NoStudentException;
import com.ioi.haryeom.member.exception.NoTeacherException;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import com.ioi.haryeom.tutoring.dto.StudentTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.StudentTutoringResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringListResponse;
import com.ioi.haryeom.tutoring.dto.TeacherTutoringResponse;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class TutoringService {

    private final TutoringRepository tutoringRepository;

    private final String unauthorizedExceptionMessage = "회원 정보가 인증되지 않았습니다.";

    public TeacherTutoringListResponse getTeacherTutoringList(Member member) {
        if(member == null || member.getId() == null) {
            throw new UnauthorizedException(unauthorizedExceptionMessage);
        } else if(!member.getRole().equals(Role.TEACHER)) {
            throw new NoTeacherException();
        }

        List<Tutoring> teacherTutoringList = tutoringRepository.findAllByTeacherIdAndStatus(member.getId(), TutoringStatus.IN_PROGRESS);

        List<TeacherTutoringResponse> teacherTutoringResponses = teacherTutoringList
            .stream()
            .map(TeacherTutoringResponse::new)
            .collect(Collectors.toList());

        return new TeacherTutoringListResponse(teacherTutoringResponses);
    }

    public StudentTutoringListResponse getStudentTutoringList(Member member) {
        if(member == null || member.getId() == null) {
            throw new UnauthorizedException(unauthorizedExceptionMessage);
        } else if(!member.getRole().equals(Role.STUDENT)) {
            throw new NoStudentException();
        }

        List<Tutoring> studentTutoringList = tutoringRepository.findAllByStudentIdAndStatus(member.getId(), TutoringStatus.IN_PROGRESS);

        List<StudentTutoringResponse> studentTutoringResponses = studentTutoringList
            .stream()
            .map(StudentTutoringResponse::new)
            .collect(Collectors.toList());

        return new StudentTutoringListResponse(studentTutoringResponses);
    }
}
