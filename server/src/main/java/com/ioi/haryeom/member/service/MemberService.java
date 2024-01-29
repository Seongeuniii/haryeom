package com.ioi.haryeom.member.service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ioi.haryeom.auth.service.AuthService;
import com.ioi.haryeom.auth.service.TokenService;
import com.ioi.haryeom.common.repository.SubjectRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Student;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.domain.TeacherSubject;
import com.ioi.haryeom.member.domain.type.Role;
import com.ioi.haryeom.member.dto.EmailCertifyRequest;
import com.ioi.haryeom.member.dto.StudentCreateRequest;
import com.ioi.haryeom.member.dto.StudentInfoResponse;
import com.ioi.haryeom.member.dto.SubjectResponse;
import com.ioi.haryeom.member.dto.TeacherCreateRequest;
import com.ioi.haryeom.member.dto.TeacherInfoResponse;
import com.ioi.haryeom.member.dto.TeacherUpdateRequest;
import com.ioi.haryeom.member.exception.EmailCertifyException;
import com.ioi.haryeom.member.exception.StudentNotFoundException;
import com.ioi.haryeom.member.exception.SubjectNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.member.repository.StudentRepository;
import com.ioi.haryeom.member.repository.TeacherRepository;
import com.ioi.haryeom.member.repository.TeacherSubjectRepository;
import com.univcert.api.UnivCert;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${spring.univcert.api-key}")
    private String univKey;

    private final AuthService authService;
    private final TokenService tokenService;

    private final MemberRepository memberRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;
    private final SubjectRepository subjectRepository;


    public void certifyEmail(EmailCertifyRequest certifyRequest) {
        try {
            Map<String, Object> response = UnivCert.certify(univKey, certifyRequest.getEmail(),
                certifyRequest.getUnivName(), true);

            boolean success = Boolean.parseBoolean(String.valueOf(response.get("success")));
            if (!success) {
                throw new EmailCertifyException(String.valueOf(response.get("message")));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Long createStudent(Member user, MultipartFile profileImg,
        StudentCreateRequest createRequest) {
        try {
            Member member = findMemberById(user.getId());

            String profileUrl = createRequest.getProfileUrl();

            if (profileImg != null) {
                String fileName = String.valueOf(member.getId());
                profileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(profileImg.getContentType());
                metadata.setContentLength(profileImg.getSize());

                amazonS3Client.putObject(bucket, fileName, profileImg.getInputStream(), metadata);
            }

            Student student = Student.builder()
                .member(member)
                .grade(createRequest.getGrade())
                .school(createRequest.getSchool())
                .build();

            member.createStudent(student, Role.STUDENT, profileUrl,
                createRequest.getName(), createRequest.getPhone());

            studentRepository.save(student);

            return member.getId();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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
    public void updateStudent(Member user, MultipartFile profileImg,
        StudentInfoResponse studentRequest) {
        try {
            Member member = findMemberById(user.getId());

            String profileUrl = studentRequest.getProfileUrl();
            if (profileImg != null) {
                String fileName = String.valueOf(member.getId());
                profileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(profileImg.getContentType());
                metadata.setContentLength(profileImg.getSize());

                amazonS3Client.putObject(bucket, fileName, profileImg.getInputStream(), metadata);
            }

            Student student = member.getStudent();

            student.updateStudent(studentRequest.getGrade(), studentRequest.getSchool());

            member.updateStudent(profileUrl,
                studentRequest.getName(), studentRequest.getPhone());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Long createTeacher(Member user, MultipartFile profileImg,
        TeacherCreateRequest teacherRequest) {
        try {
            Member member = findMemberById(user.getId());

            String profileUrl = teacherRequest.getProfileUrl();
            if (profileImg != null) {
                String fileName = String.valueOf(member.getId());
                profileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(profileImg.getContentType());
                metadata.setContentLength(profileImg.getSize());

                amazonS3Client.putObject(bucket, fileName, profileImg.getInputStream(), metadata);

            }

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

            member.createTeacher(teacher, Role.TEACHER, profileUrl,
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
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public TeacherInfoResponse getTeacher(Long memberId) {
        Member member = findMemberById(memberId);

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
    public void updateTeacher(Member user, MultipartFile profileImg,
        TeacherUpdateRequest teacherRequest) {
        try {
            Member member = findMemberById(user.getId());

            String profileUrl = teacherRequest.getProfileUrl();
            if (profileImg != null) {
                String fileName = String.valueOf(member.getId());
                profileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType(profileImg.getContentType());
                metadata.setContentLength(profileImg.getSize());

                amazonS3Client.putObject(bucket, fileName, profileImg.getInputStream(), metadata);


            }

            member.updateTeacher(profileUrl, teacherRequest.getName(),
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
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
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
