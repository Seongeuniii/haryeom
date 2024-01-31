package com.ioi.haryeom.textbook.service;

import com.ioi.haryeom.aws.S3Upload;
import com.ioi.haryeom.aws.exception.S3UploadException;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.repository.SubjectRepository;
import com.ioi.haryeom.common.util.AuthMemberId;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.exception.NoTeacherException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.textbook.domain.Assignment;
import com.ioi.haryeom.textbook.domain.Textbook;
import com.ioi.haryeom.textbook.dto.*;
import com.ioi.haryeom.textbook.exception.*;
import com.ioi.haryeom.textbook.repository.AssignmentRespository;
import com.ioi.haryeom.textbook.repository.TextbookRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class TextbookService {

    private final S3Upload s3Upload;

    private final TextbookRepository textbookRepository;

    private final MemberRepository memberRepository;

    private final AssignmentRespository assignmentRespository;
    private final SubjectRepository subjectRepository;

    private final TutoringRepository tutoringRepository;

    // 학습자료 추가
    @Transactional
    public Long createTextbook(MultipartFile file, TextbookRequest request, Long teacherMemberId) {

        String allowedExtensions = "pdf"; // pdf만 허용

        try {
            String fileName = file.getOriginalFilename();

            // 파일 Validation
            String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
            if(!allowedExtensions.contains(fileExtension)) {
                throw new FileValidationException(allowedExtensions);
            }

            // S3 업로드
            String fileUrl = s3Upload.uploadFile(fileName, file.getInputStream(), file.getSize(), file.getContentType());

            // PDF 첫 페이지 PNG 저장 로직
            // 파일 로드해서
            PDDocument document = PDDocument.load(file.getInputStream());

            String coverImg = null;
            int totalPage = document.getNumberOfPages();

            if(request.isFirstPageCover() == true){
                PDFRenderer pdfRenderer = new PDFRenderer(document);
                // 0번 인덱스 가져오기(표지)
                PDPage firstPage = document.getPage(0);
                // 이미지 해상도 설정
                int dpi =300;
                BufferedImage image = pdfRenderer.renderImageWithDPI(0, dpi);

                // BufferedImage 를 InputStream 으로 변환
                ByteArrayOutputStream os = new ByteArrayOutputStream();
                ImageIO.write(image, "png", os);
                byte[] buffer = os.toByteArray();
                InputStream is = new ByteArrayInputStream(buffer);

                // 적당한 이름 설정 후 S3 업로드
                String coverImageFileName = request.getTextbookName() + "_cover.png";

                coverImg = s3Upload.uploadFile(coverImageFileName, is, buffer.length, "image/png");

                is.close();
                document.close();

            }
            Member teacherMember = findMemberById(teacherMemberId);
            Subject subject = subjectRepository.findById(request.getSubjectId())
                    .orElseThrow();

            Textbook textbook = Textbook.builder()
                    .teacherMember(teacherMember)
                    .subject(subject)
                    .textbookName(request.getTextbookName())
                    .textbookUrl(fileUrl)
                    .firstPageCover(request.isFirstPageCover())
                    .totalPage(totalPage)
                    .coverImg(coverImg)
                    .build();

            Textbook savedTextbook = textbookRepository.save(textbook);
            return savedTextbook.getId();

        } catch (IOException e) {
            e.printStackTrace();
            throw new S3UploadException();
        }
    }

    // 과외별 학습자료 리스트 조회
    public List<TextbookListByTutoringResponse> getTextbookListByTutoring(Long tutoringId) {
        Tutoring tutoring = tutoringRepository.findById(tutoringId)
                .orElseThrow(() -> new TutoringNotFoundException(tutoringId));

        List<Assignment> assignments = assignmentRespository.findByTutoringId(tutoring.getId());
        if(assignments.size() == 0) throw new SelectedTextbookNotFoundException(tutoringId);
        return assignments.stream()
                .map(Assignment::getTextbook)
                .distinct()
                .map(TextbookListByTutoringResponse::new)
                .collect(Collectors.toList());
    }

    // 학습자료 불러오기
    public TextbookResponse getTextbook(Long textbookId) {
        Textbook textbook = findTextbookById(textbookId);
        return new TextbookResponse(textbook);
    }

    // 학습자료 삭제
    public void deleteTextbook(Long textbookId, Long teacherMemberId) {
        Textbook textbook = findTextbookById(textbookId);
        Member teacherMember = memberRepository.findById(teacherMemberId)
                .orElseThrow(() -> new MemberNotFoundException(teacherMemberId));
        if(textbook.getTeacherMember() != teacherMember) {
            throw new NoTeacherException();
        }

        textbook.delete();
    }

    // 선생님 학습자료 리스트 조회
    public List<TextbookWithStudentsResponse> getTextbooksWithStudents(Long memberId, Long teacherMemberId) {
//        if(memberId != teacherMemberId) throw new NoTeacherException();

        Member teacherMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));
        List<Textbook> textbooks = textbookRepository.findAllByTeacherMember(teacherMember);
        if(textbooks.size() == 0) throw new RegisteredTextbookNotFoundException(teacherMemberId);

        return textbooks.stream().map(textbook -> {
            List<Assignment> assignments = assignmentRespository.findByTextbook(textbook);
            List<TextbookWithStudentsResponse.StudentInfo> studentInfos = assignments.stream()
                    .map(assignment -> assignment.getTutoring().getStudent())
                    .map(TextbookWithStudentsResponse.StudentInfo::new)
                    .collect(Collectors.toList());
            return new TextbookWithStudentsResponse(textbook, studentInfos);
        }).collect(Collectors.toList());
    }

    // 학습자료별 지정 가능 학생 리스트 조회
    public List<TextbookWithStudentsResponse.StudentInfo> getAssignableStudent(Long textbookId,Long teacherMemberId) {

        List<Tutoring> tutorings = tutoringRepository.findAllByTeacherId(teacherMemberId);

        Textbook currentTextbook = textbookRepository.findById(textbookId)
                .orElseThrow(() -> new TextbookNotFoundException(textbookId));
        List<Assignment> currentAssignments = assignmentRespository.findByTextbook(currentTextbook);
        List<Long> assignedStudentIds = currentAssignments.stream()
                .map(assignment -> assignment.getTutoring().getStudent().getId())
                .collect(Collectors.toList());

        List<TextbookWithStudentsResponse.StudentInfo> assignableStudents = tutorings.stream()
                .map(Tutoring::getStudent)
                .filter(student -> !assignedStudentIds.contains(student.getStudent()))
                .distinct()
                .map(TextbookWithStudentsResponse.StudentInfo::new)
                .collect(Collectors.toList());

        if(assignableStudents.isEmpty()) throw new AssignStudentNotFoundException();

        return assignableStudents;
    }

    // 학습자료 학생 지정
    public void putAssignment(Long textbookId, List<Long> tutoringIds) {
        Textbook textbook = findTextbookById(textbookId);

        for(Long tutoringId : tutoringIds) {
            Tutoring tutoring = tutoringRepository.findById(tutoringId)
                    .orElseThrow(() -> new TutoringNotFoundException(tutoringId));

            Assignment assignment = Assignment.builder()
                    .tutoring(tutoring)
                    .textbook(textbook)
                    .build();

            assignmentRespository.save(assignment);
        }
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));
    }

    private Textbook findTextbookById(Long textbookId) {
        return textbookRepository.findById(textbookId)
                .orElseThrow(() -> new TextbookNotFoundException(textbookId));
    }
}
