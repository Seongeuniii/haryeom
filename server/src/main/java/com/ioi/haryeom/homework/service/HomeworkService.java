package com.ioi.haryeom.homework.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.homework.domain.Drawing;
import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.*;
import com.ioi.haryeom.homework.exception.HomeworkNotFoundException;
import com.ioi.haryeom.homework.exception.HomeworkStatusException;
import com.ioi.haryeom.homework.exception.InvalidDeadlineException;
import com.ioi.haryeom.homework.exception.InvalidPageRangeException;
import com.ioi.haryeom.homework.repository.DrawingRepository;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.member.domain.type.Role;
import com.ioi.haryeom.member.exception.NoTeacherException;
import com.ioi.haryeom.textbook.domain.Textbook;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.textbook.exception.TextNotFoundException;
import com.ioi.haryeom.textbook.repository.TextbookRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;

import java.io.*;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class HomeworkService {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final HomeworkRepository homeworkRepository;
    private final TextbookRepository textbookRepository;
    private final DrawingRepository drawingRepository;
    private final TutoringRepository tutoringRepository;

    public HomeworkListResponse getHomeworkList(Long tutoringId, Pageable pageable) {

        Tutoring tutoring = findTutoringById(tutoringId);

        Page<Homework> homeworkPage = homeworkRepository.findAllByTutoring(tutoring, pageable);

        int progressPercentage = calculateProgressPercentage(tutoring);

        List<HomeworkResponse> homeworkResponses = homeworkPage.getContent()
            .stream()
            .map(HomeworkResponse::new)
            .collect(Collectors.toList());

        return new HomeworkListResponse(homeworkResponses, progressPercentage);
    }

    @Transactional
    public Long createHomework(Long tutoringId, HomeworkRequest request, AuthInfo authInfo) {

        validateDeadline(request.getDeadline());
        validateTeacherRole(authInfo);

        Tutoring tutoring = findTutoringById(tutoringId);

        Textbook textbook = findTextbookById(request.getTextbookId());

        validatePageRange(textbook, request.getStartPage(), request.getEndPage());

        Homework homework = Homework.builder()
            .textbook(textbook)
            .tutoring(tutoring)
            .deadline(request.getDeadline())
            .startPage(request.getStartPage())
            .endPage(request.getEndPage())
            .build();

        Homework savedHomework = homeworkRepository.save(homework);
        return savedHomework.getId();
    }

    public HomeworkResponse getHomework(Long tutoringId, Long homeworkId) {

        findTutoringById(tutoringId);

        Homework homework = findHomeworkById(homeworkId);

        return new HomeworkResponse(homework);
    }

    @Transactional
    public void updateHomework(Long tutoringId, Long homeworkId, HomeworkRequest request, AuthInfo authInfo) {

        validateTeacherRole(authInfo);
        validateDeadline(request.getDeadline());

        Homework homework = findHomeworkById(homeworkId);
        validateOwner(authInfo, homework);
        validateHomeworkUnconfirmed(homework);

        Tutoring tutoring = findTutoringById(tutoringId);

        Textbook textbook = findTextbookById(request.getTextbookId());
        validatePageRange(textbook, request.getStartPage(), request.getEndPage());

        homework.update(textbook, tutoring, request.getDeadline(), request.getStartPage(),
            request.getEndPage());
    }

    @Transactional
    public void deleteHomework(Long tutoringId, Long homeworkId, AuthInfo authInfo) {

        validateTeacherRole(authInfo);

        findTutoringById(tutoringId);

        Homework homework = findHomeworkById(homeworkId);

        validateOwner(authInfo, homework);
        validateHomeworkUnconfirmed(homework);

        homework.delete();
    }

    private int calculateProgressPercentage(Tutoring tutoring) {

        long totalHomeworkCount = homeworkRepository.countByTutoring(tutoring);
        long completedHomeworkCount = homeworkRepository.countByTutoringAndStatus(tutoring,
            HomeworkStatus.COMPLETED);

        return (int) Math.round(((double) completedHomeworkCount / totalHomeworkCount) * 100);
    }

    //// 학생 숙제

    public HomeworkLoadResponse getLoadHomework(Long homeworkId, AuthInfo authInfo) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));
        // 숙제 상태 변경
        homework.confirm();

        Textbook textbook = homework.getTextbook();
        // pdf 숙제 범위만큼 자르기
        // 추가적으로 : 이미 잘라진 녀석(업로드된)은 자르는 부분을 skip하는 로직도 생각해 보면 좋을듯
        String url = textbook.getTextbookUrl();
        int startPage = homework.getStartPage();
        int endPage = homework.getEndPage();

        TextbookResponse textbookInfo = null;

        try {
            url = URLDecoder.decode(url, "utf-8");
            String fileKey = extractFileKey(url);
            S3Object s3Object = amazonS3Client.getObject(bucket, fileKey);
            S3ObjectInputStream inputStream = s3Object.getObjectContent();

            PDDocument document = PDDocument.load(inputStream);
            PDDocument newDoc = new PDDocument();

            for(int i = startPage; i <= endPage; i++){
                newDoc.addPage(document.getPage(i-1));
            }

            String fileName = "homework_" + textbook.getTextbookName();
            String fileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

            ByteArrayOutputStream outStream = new ByteArrayOutputStream();
            newDoc.save(outStream);
            byte[] pdfByte = outStream.toByteArray();
            InputStream newInputStream = new ByteArrayInputStream(pdfByte);

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(pdfByte.length);
            metadata.setContentType("/application/pdf");

            amazonS3Client.putObject(bucket, fileName, newInputStream, metadata);

            textbookInfo = new TextbookResponse(textbook, fileUrl);

        } catch (Exception e) {
            // 예외처리
            e.printStackTrace();
        }

        // 드로잉 불러오기
        List<Drawing> drawings =  drawingRepository.findAllByHomework(homework);
        List<StudentDrawingResponse> drawingResponses = drawings.stream()
                .map(StudentDrawingResponse::new)
                .collect(Collectors.toList());

        return new HomeworkLoadResponse(homework, textbookInfo, drawingResponses);

    }

    public HomeworkReviewResponse getReviewHomework(Long homeworkId, AuthInfo authInfo) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));

        Textbook textbook = homework.getTextbook();
        // pdf 숙제 범위만큼 자르기
        String url = textbook.getTextbookUrl();
        int startPage = homework.getStartPage();
        int endPage = homework.getEndPage();

        TextbookResponse textbookInfo = null;

        try {
            url = URLDecoder.decode(url, "utf-8");
            String fileKey = extractFileKey(url);
            S3Object s3Object = amazonS3Client.getObject(bucket, fileKey);
            S3ObjectInputStream inputStream = s3Object.getObjectContent();

            PDDocument document = PDDocument.load(inputStream);
            PDDocument newDoc = new PDDocument();

            for(int i = startPage; i <= endPage; i++){
                newDoc.addPage(document.getPage(i-1));
            }

            String fileName = "homework_" + textbook.getTextbookName();
            String fileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

            ByteArrayOutputStream outStream = new ByteArrayOutputStream();
            newDoc.save(outStream);
            byte[] pdfByte = outStream.toByteArray();
            InputStream newInputStream = new ByteArrayInputStream(pdfByte);

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(pdfByte.length);
            metadata.setContentType("/application/pdf");

            amazonS3Client.putObject(bucket, fileName, newInputStream, metadata);

            textbookInfo = new TextbookResponse(textbook, fileUrl);

        } catch (Exception e) {
            // 예외처리
            e.printStackTrace();
        }

        // 드로잉 불러오기
        List<Drawing> drawings = drawingRepository.findAllByHomework(homework);
        List<TeacherDrawingResponse> drawingResponses = drawings.stream()
                .map(TeacherDrawingResponse::new)
                .collect(Collectors.toList());

        return new HomeworkReviewResponse(homework, textbookInfo, drawingResponses);
    }

    public void saveHomework(Long homeworkId, HomeworkDrawingRequest drawings, AuthInfo authInfo) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));

        // TODO: authInfo

        for(MultipartFile file : drawings.getFile()) {

            String fileName = file.getOriginalFilename();
            String fileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            try {
                amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
            } catch (IOException e) {
                // TODO: 예외처리
                e.printStackTrace();
            }

            Drawing drawing = Drawing.builder()
                    .homework(homework)
                    .page(drawings.getPage())
                    .homeworkDrawingUrl(fileUrl)
                    .build();

            drawingRepository.save(drawing);
        }
    }

    public void saveHomeworkReview(Long homeworkId, HomeworkDrawingRequest drawings, AuthInfo authInfo) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));

        // TODO: authInfo

        for(MultipartFile file : drawings.getFile()) {

            String fileName = file.getOriginalFilename();
            String fileUrl = amazonS3Client.getUrl(bucket, fileName).toString();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            try {
                amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
            } catch (IOException e) {
                // TODO: 예외처리
                e.printStackTrace();
            }

            Drawing drawing = Drawing.builder()
                    .homework(homework)
                    .page(drawings.getPage())
                    .reviewDrawingUrl(fileUrl)
                    .build();

            drawingRepository.save(drawing);
        }
    }

    public void submitHomework(Long homeworkId, AuthInfo authInfo) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));

        homework.submit();
    }

    //TODO: 회원쪽에서 구현해야함
    private void validateTeacherRole(AuthInfo authInfo) {
        if (!Role.TEACHER.name().equals(authInfo.getRole())) {
            throw new NoTeacherException();
        }
    }

    private void validateDeadline(LocalDate deadline) {
        LocalDate current = LocalDate.now();
        if (deadline.isBefore(current)) {
            throw new InvalidDeadlineException();
        }
    }

    private void validatePageRange(Textbook textbook, Integer startPage, Integer endPage) {
        if (startPage < 1 || endPage > textbook.getTotalPage() || startPage > endPage) {
            throw new InvalidPageRangeException();
        }
    }

    private void validateOwner(AuthInfo authInfo, Homework homework) {
        if (!homework.isOwner(authInfo.getMemberId())) {
            throw new AuthorizationException(authInfo.getMemberId());
        }
    }

    private void validateHomeworkUnconfirmed(Homework homework) {
        if (homework.getStatus() != HomeworkStatus.UNCONFIRMED) {
            throw new HomeworkStatusException();
        }
    }

    // TODO: Assignment 매칭O -> Assignent-Homework 검증
    // TODO: Assignment 매칭X -> Resource-Tutoring, Homework-Tutoring 검증


    private Tutoring findTutoringById(Long tutoringId) {
        return tutoringRepository.findById(tutoringId)
            .orElseThrow(() -> new TutoringNotFoundException(tutoringId));
    }

    private Textbook findTextbookById(Long textbookId) {
        return textbookRepository.findById(textbookId)
            .orElseThrow(() -> new TextNotFoundException(textbookId));
    }

    private Homework findHomeworkById(Long homeworkId) {
        return homeworkRepository.findById(homeworkId)
            .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));
    }

    // URL 에서 fileKey 추출하는 메서드
    private String extractFileKey(String url) {
        String[] parts =url.split("/");
        if(parts.length > 3) return String.join("/", Arrays.copyOfRange(parts, 3, parts.length));
        else return "";
    }
}
