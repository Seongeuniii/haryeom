package com.ioi.haryeom.textbook.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.textbook.domain.Assignment;
import com.ioi.haryeom.textbook.domain.Textbook;
import com.ioi.haryeom.textbook.dto.*;
import com.ioi.haryeom.textbook.exception.TextNotFoundException;
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
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class TextbookService {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final TextbookRepository textbookRepository;

    private final MemberRepository memberRepository;

    private final AssignmentRespository assignmentRespository;

    private final TutoringRepository tutoringRepository;

    @Transactional
    public Long createTextbook(MultipartFile file, TextbookRequest request, AuthInfo authinfo) {

        try {
            // S3 업로드 로직
            String fileName = file.getOriginalFilename();
            String fileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

            // S3에 PDF 업로드를 위한 메타데이터 설정
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);

            // PDF 첫 페이지 PNG 저장 로직
            String coverImg = null;
            if(request.isFirstPageCover() == true){
                // 파일 로드해서
                PDDocument document =PDDocument.load(file.getInputStream());
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

                // S3에 이미지 업로드를 위한 메타데이터 설정
                ObjectMetadata coverImageMetadata = new ObjectMetadata();
                coverImageMetadata.setContentType("image/png");
                coverImageMetadata.setContentLength(buffer.length);

                // 적당한 이름 설정 후 S3 업로드
                String coverImageFileName = request.getTextbookName() + "_cover.png";
                amazonS3Client.putObject(bucket, coverImageFileName, is, coverImageMetadata);

                coverImg = amazonS3Client.getUrl(bucket, coverImageFileName).toString();
                is.close();
                document.close();

            }
            Member teacherMember = findMemberById(authinfo.getMemberId());

            Textbook textbook = Textbook.builder()
                    .teacherMember(teacherMember)
                    .textbookName(request.getTextbookName())
                    .textbookURL(fileUrl)
                    .firstPageCover(request.isFirstPageCover())
                    .totalPage(request.getTotalPage())
                    .coverImg(coverImg)
                    .build();

            Textbook savedTextbook = textbookRepository.save(textbook);
            return savedTextbook.getId();

        } catch (IOException e) {
            // S3 업로드 실패시
            e.printStackTrace();
            return -1L;
        }

    }

    public List<TextbookListByTutoringResponse> getTextbookListByTutoring(Long tutoringId) {
        Tutoring tutoring = tutoringRepository.findById(tutoringId)
                .orElseThrow(() -> new TutoringNotFoundException(tutoringId));

        List<Assignment> assignments = assignmentRespository.findByTutoringId(tutoring.getId());
        return assignments.stream()
                .map(Assignment::getTextbook)
                .distinct()
                .map(TextbookListByTutoringResponse::new)
                .collect(Collectors.toList());
    }

    public TextbookResponse getTextbook(Long textbookId) {
        Textbook textbook = findTextbookById(textbookId);
        return new TextbookResponse(textbook);
    }

    public void deleteTextbook(Long textbookId, AuthInfo authInfo) {
        // TODO: authInfo가 해당 학습 자료 담당자인지?

        Textbook textbook = findTextbookById(textbookId);
        textbook.delete();
    }

    public List<TextbookWithStudentsResponse> getTextbooksWithStudents(Long memberId) {
        Member teacherMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(memberId));
        List<Textbook> textbooks = textbookRepository.findAllByTeacherMember(teacherMember);

        return textbooks.stream().map(textbook -> {
            List<Assignment> assignments = assignmentRespository.findByTextbook(textbook);
            List<TextbookWithStudentsResponse.StudentInfo> studentInfos = assignments.stream()
                    .map(assignment -> assignment.getTutoring().getStudent())
                    .map(TextbookWithStudentsResponse.StudentInfo::new)
                    .collect(Collectors.toList());
            return new TextbookWithStudentsResponse(textbook, studentInfos);
        }).collect(Collectors.toList());
    }

    public List<TextbookWithStudentsResponse.StudentInfo> getAssignableStudent(Long textbookId, AuthInfo authInfo) {

        List<Tutoring> tutorings = tutoringRepository.findAllByTeacherId(authInfo.getMemberId());

        Textbook currentTextbook = textbookRepository.findById(textbookId)
                .orElseThrow(() -> new TextNotFoundException(textbookId));
        List<Assignment> currentAssignments = assignmentRespository.findByTextbook(currentTextbook);
        List<Long> assignedStudentIds = currentAssignments.stream()
                .map(assignment -> assignment.getTutoring().getStudent().getId())
                .collect(Collectors.toList());

        return tutorings.stream()
                .map(Tutoring::getStudent)
                .filter(student -> !assignedStudentIds.contains(student.getStudent()))
                .distinct()
                .map(TextbookWithStudentsResponse.StudentInfo::new)
                .collect(Collectors.toList());
    }

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
                .orElseThrow(() -> new TextNotFoundException(textbookId));
    }
}
