package com.ioi.haryeom.member.service;


import com.ioi.haryeom.auth.service.AuthService;
import com.ioi.haryeom.auth.service.TokenService;
import com.ioi.haryeom.common.repository.SubjectRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Student;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.domain.TeacherSubject;
import com.ioi.haryeom.member.domain.type.Role;
import com.ioi.haryeom.member.dto.StudentCreateRequest;
import com.ioi.haryeom.member.dto.StudentInfoResponse;
import com.ioi.haryeom.member.dto.SubjectResponse;
import com.ioi.haryeom.member.dto.TeacherCreateRequest;
import com.ioi.haryeom.member.dto.TeacherInfoResponse;
import com.ioi.haryeom.member.exception.StudentNotFoundException;
import com.ioi.haryeom.member.exception.SubjectNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.member.repository.StudentRepository;
import com.ioi.haryeom.member.repository.TeacherRepository;
import com.ioi.haryeom.member.repository.TeacherSubjectRepository;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final StudentRepository studentRepository;


    @Transactional
    public Long createStudent(Member user, StudentCreateRequest createRequest) {

        Member member = findMemberById(user.getId());

        Student student = Student.builder()
            .member(member)
            .grade(createRequest.getGrade())
            .school(createRequest.getSchool())
            .build();

        member.createStudent(student, Role.STUDENT, createRequest.getProfileUrl(),
            createRequest.getName(), createRequest.getPhone());

        studentRepository.save(student);
        return member.getId();
    }

    public StudentInfoResponse getStudent(Long memberId) {
        Member member = findMemberById(memberId);
        return StudentInfoResponse.builder()
            .profileUrl(member.getProfileUrl())
            .name(member.getName())
            .phone(member.getPhone())
            .grade(member.getStudent().getGrade())
            .school(member.getStudent().getSchool())
            .build();
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
            .orElseThrow(() -> new StudentNotFoundException(memberId));
    }
}
