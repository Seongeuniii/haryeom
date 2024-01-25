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
import com.ioi.haryeom.member.dto.TeacherUpdateRequest;
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

    private final AuthService authService;
    private final TokenService tokenService;

    private final MemberRepository memberRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final SubjectRepository subjectRepository;

    private final Logger log = LoggerFactory.getLogger(getClass());


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

    @Transactional
    public void updateStudent(Member user, StudentInfoResponse studentRequest) {
        Member member = findMemberById(user.getId());

        Student student = member.getStudent();

        student.updateStudent(studentRequest.getGrade(), studentRequest.getSchool());

        member.updateStudent(studentRequest.getProfileUrl(),
            studentRequest.getName(), studentRequest.getPhone());
    }

    @Transactional
    public Long createTeacher(Member user, TeacherCreateRequest teacherRequest) {
        Member member = findMemberById(user.getId());

        Teacher teacher = Teacher.builder()
            .member(member)
            .profileStatus(teacherRequest.getProfileStatus())
            .college(teacherRequest.getCollege())
            .collegeEmail(teacherRequest.getCollegeEmail())
            .gender(teacherRequest.getGender())
            .salary(teacherRequest.getSalary())
            .career(teacherRequest.getCareer())
            .introduce(teacherRequest.getIntroduce())
            .build();

        member.createTeacher(teacher, Role.TEACHER, teacherRequest.getProfileUrl(),
            teacherRequest.getName(), teacherRequest.getPhone());
        teacherRepository.save(teacher);

        List<SubjectResponse> subjects = teacherRequest.getSubjects();
        for (SubjectResponse subjectResponse : subjects) {

            TeacherSubject teacherSubject = TeacherSubject.builder()
                .teacher(teacher)
                .subject(
                    subjectRepository.findById(subjectResponse.getSubjectId()).orElseThrow(
                        () -> new SubjectNotFoundException(subjectResponse.getSubjectId())
                    )
                )
                .build();

            teacherSubjectRepository.save(teacherSubject);
        }


        return member.getId();
    }

    public TeacherInfoResponse getTeacher(Long memberId) {
        Member member = findMemberById(memberId);

        List<SubjectResponse> list = findSubjectsById(memberId);
        for (SubjectResponse sub : list) {
            log.info("ID : " + sub.getSubjectId() + " 과목명 : " + sub.getName());
        }

        return TeacherInfoResponse.builder()
            .profileUrl(member.getProfileUrl())
            .name(member.getName())
            .phone(member.getPhone())
            .profileStatus(member.getTeacher().getProfileStatus())
            .college(member.getTeacher().getCollege())
            .collegeEmail(member.getTeacher().getCollegeEmail())
            .gender(member.getTeacher().getGender())
            .salary(member.getTeacher().getSalary())
            .career(member.getTeacher().getCareer())
            .subjects(findSubjectsById(memberId))
            .introduce(member.getTeacher().getIntroduce())
            .build();
    }

    @Transactional
    public void updateTeacher(Member user, TeacherUpdateRequest teacherRequest) {
        Member member = findMemberById(user.getId());

        member.updateTeacher(teacherRequest.getProfileUrl(), teacherRequest.getName(),
            teacherRequest.getPhone());

        Teacher teacher = member.getTeacher();

        List<TeacherSubject> teacherSubjects = teacher.getTeacherSubjects();

        teacherSubjectRepository.deleteAll(teacherSubjects);

        List<SubjectResponse> subjects = teacherRequest.getSubjects();
        for (SubjectResponse subjectResponse : subjects) {

            TeacherSubject teacherSubject = TeacherSubject.builder()
                .teacher(teacher)
                .subject(
                    subjectRepository.findById(subjectResponse.getSubjectId()).orElseThrow(
                        () -> new SubjectNotFoundException(subjectResponse.getSubjectId())
                    )
                )
                .build();

            teacherSubjectRepository.save(teacherSubject);
        }

        teacher.updateTeacher(teacherRequest.getProfileStatus(),
            teacherRequest.getCollege(),
            teacherRequest.getCollegeEmail(),
            teacherRequest.getGender(),
            teacherRequest.getSalary(),
            teacherRequest.getCareer(),
            teacherRequest.getIntroduce());
    }

    @Transactional
    public void deleteMember(Member user, HttpServletResponse response) throws IOException {
        Member member = findMemberById(user.getId());
        member.delete();
        authService.oauthLogout(user.getId(), "KAKAO");
        tokenService.resetHeader(response);
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
            .orElseThrow(() -> new StudentNotFoundException(memberId));
    }

    private List<SubjectResponse> findSubjectsById(Long teacherId) {
        return teacherSubjectRepository
            .findByTeacherId(teacherId)
            .stream()
            .map(TeacherSubject::getSubject)
            .map(SubjectResponse::from)
            .collect(Collectors.toList());
    }
}
