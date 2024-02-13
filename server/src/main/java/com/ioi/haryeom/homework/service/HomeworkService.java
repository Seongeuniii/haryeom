package com.ioi.haryeom.homework.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.aws.S3Upload;
import com.ioi.haryeom.aws.exception.S3UploadException;
import com.ioi.haryeom.homework.domain.Drawing;
import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.HomeworkListResponse;
import com.ioi.haryeom.homework.dto.HomeworkLoadResponse;
import com.ioi.haryeom.homework.dto.HomeworkRequest;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.dto.HomeworkReviewResponse;
import com.ioi.haryeom.homework.dto.StudentDrawingResponse;
import com.ioi.haryeom.homework.dto.TeacherDrawingResponse;
import com.ioi.haryeom.homework.exception.HomeworkAlreadySubmittedException;
import com.ioi.haryeom.homework.exception.HomeworkNotFoundException;
import com.ioi.haryeom.homework.exception.HomeworkStatusConcurrencyException;
import com.ioi.haryeom.homework.exception.HomeworkStatusException;
import com.ioi.haryeom.homework.exception.InvalidDeadlineException;
import com.ioi.haryeom.homework.exception.InvalidPageRangeException;
import com.ioi.haryeom.homework.repository.DrawingRepository;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.textbook.domain.Textbook;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.textbook.exception.TextbookNotFoundException;
import com.ioi.haryeom.textbook.repository.TextbookRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
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

    private final MemberRepository memberRepository;
    private final S3Upload s3Upload;

    private final HomeworkRepository homeworkRepository;
    private final TextbookRepository textbookRepository;
    private final DrawingRepository drawingRepository;
    private final TutoringRepository tutoringRepository;

    // 과외 숙제 리스트 조회
    public HomeworkListResponse getHomeworkList(Long tutoringId, Pageable pageable, Long memberId) {

        Tutoring tutoring = findTutoringById(tutoringId);
        Member member = findMemberById(memberId);
        validateMemberInTutoring(tutoring, member);

        Page<Homework> homeworkPage = homeworkRepository.findAllByTutoringAndIsDeletedFalse(tutoring, pageable);

        int progressPercentage = calculateProgressPercentage(tutoring);

        List<HomeworkResponse> homeworkResponses = homeworkPage.getContent()
            .stream()
            .map(HomeworkResponse::new)
            .collect(Collectors.toList());

        return new HomeworkListResponse(homeworkResponses, progressPercentage);
    }

    // 과외 숙제 등록
    @Transactional
    public Long createHomework(Long tutoringId, HomeworkRequest request, Long memberId) {

        validateDeadline(request.getDeadline());

        Tutoring tutoring = findTutoringById(tutoringId);
        Member member = findMemberById(memberId);
        validateMemberInTutoring(tutoring, member);

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

    // 과외 숙제 상세 조회
    public HomeworkResponse getHomework(Long tutoringId, Long homeworkId, Long memberId) {

        Tutoring tutoring = findTutoringById(tutoringId);
        Member member = findMemberById(memberId);
        validateMemberInTutoring(tutoring, member);

        Homework homework = findHomeworkById(homeworkId);

        return new HomeworkResponse(homework);
    }

    // 과외 숙제 수정
    @Transactional
    public void updateHomework(Long tutoringId, Long homeworkId, HomeworkRequest request, Long memberId) {
        try {
            validateDeadline(request.getDeadline());

            Homework homework = findHomeworkById(homeworkId);
            Member member = findMemberById(memberId);
            validateOwner(member, homework);
            validateHomeworkUnconfirmed(homework);

            Tutoring tutoring = findTutoringById(tutoringId);

            Textbook textbook = findTextbookById(request.getTextbookId());
            validatePageRange(textbook, request.getStartPage(), request.getEndPage());

            homework.update(textbook, tutoring, request.getDeadline(), request.getStartPage(),
                request.getEndPage());
        } catch (ObjectOptimisticLockingFailureException e) {
            throw new HomeworkStatusConcurrencyException();
        }
    }

    // 과외 숙제 삭제
    @Transactional
    public void deleteHomework(Long tutoringId, Long homeworkId, Long memberId) {
        try {
            findTutoringById(tutoringId);

            Homework homework = findHomeworkById(homeworkId);
            Member member = findMemberById(memberId);
            validateOwner(member, homework);
            validateHomeworkUnconfirmed(homework);

            homework.delete();
        } catch (ObjectOptimisticLockingFailureException e) {
            throw new HomeworkStatusConcurrencyException();
        }
    }

    private int calculateProgressPercentage(Tutoring tutoring) {

        long totalHomeworkCount = homeworkRepository.countByTutoringAndIsDeletedFalse(tutoring);
        long completedHomeworkCount = homeworkRepository.countByTutoringAndStatusAndIsDeletedFalse(tutoring,
            HomeworkStatus.COMPLETED);

        return (int) Math.round(((double) completedHomeworkCount / totalHomeworkCount) * 100);
    }

    //// 학생 숙제

    @Transactional
    public HomeworkLoadResponse getLoadHomework(Long homeworkId, Long memberId) {
        Homework homework = findHomeworkById(homeworkId);

        // 숙제 상태 변경
        homework.confirm();
        homeworkRepository.save(homework);

        Textbook textbook = homework.getTextbook();
        // pdf 숙제 범위만큼 자르기
        String url = textbook.getTextbookUrl();
        int startPage = homework.getStartPage();
        int endPage = homework.getEndPage();

        validatePageRange(textbook, startPage, endPage);

        TextbookResponse textbookInfo = null;

        try {
            url = URLDecoder.decode(url, "utf-8");
            String fileKey = extractFileKey(url);
            S3Object s3Object = amazonS3Client.getObject(bucket, fileKey);
            S3ObjectInputStream inputStream = s3Object.getObjectContent();

            PDDocument document = PDDocument.load(inputStream);
            PDDocument newDoc = new PDDocument();

            for (int i = startPage; i <= endPage; i++) {
                newDoc.addPage(document.getPage(i - 1));
            }

            String fileName = "homework_" + homework.getId() + "_" + textbook.getTextbookName() + ".pdf";

            ByteArrayOutputStream outStream = new ByteArrayOutputStream();
            newDoc.save(outStream);
            byte[] pdfByte = outStream.toByteArray();
            InputStream newInputStream = new ByteArrayInputStream(pdfByte);

            String fileUrl = s3Upload.uploadFile(fileName, newInputStream, pdfByte.length, "application/pdf");

            textbookInfo = new TextbookResponse(textbook, fileUrl);

            inputStream.close();
            newInputStream.close();
            outStream.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new S3UploadException();
        }

        // 드로잉 불러오기
        List<Drawing> drawings = drawingRepository.findAllByHomework(homework);
        List<StudentDrawingResponse> drawingResponses = Collections.emptyList();

        if (!drawings.isEmpty()) {
            drawingResponses = drawings.stream()
                .map(StudentDrawingResponse::new)
                .collect(Collectors.toList());
        }

        return new HomeworkLoadResponse(homework, textbookInfo, drawingResponses);

    }

    public HomeworkReviewResponse getReviewHomework(Long homeworkId, Long memberId) {
        Homework homework = findHomeworkById(homeworkId);

        Textbook textbook = homework.getTextbook();
        // pdf 숙제 범위만큼 자르기
        String url = textbook.getTextbookUrl();
        int startPage = homework.getStartPage();
        int endPage = homework.getEndPage();

        validatePageRange(textbook, startPage, endPage);

        TextbookResponse textbookInfo = null;

        try {
            url = URLDecoder.decode(url, "utf-8");
            String fileKey = extractFileKey(url);
            S3Object s3Object = amazonS3Client.getObject(bucket, fileKey);
            S3ObjectInputStream inputStream = s3Object.getObjectContent();

            PDDocument document = PDDocument.load(inputStream);
            PDDocument newDoc = new PDDocument();

            for (int i = startPage; i <= endPage; i++) {
                newDoc.addPage(document.getPage(i - 1));
            }

            String fileName = "homework_" + textbook.getTextbookName();

            ByteArrayOutputStream outStream = new ByteArrayOutputStream();
            newDoc.save(outStream);
            byte[] pdfByte = outStream.toByteArray();
            InputStream newInputStream = new ByteArrayInputStream(pdfByte);

            String fileUrl = s3Upload.uploadFile(fileName, newInputStream, pdfByte.length, "application/pdf");

            textbookInfo = new TextbookResponse(textbook, fileUrl);

        } catch (Exception e) {
            e.printStackTrace();
            throw new S3UploadException();
        }

        // 드로잉 불러오기
        List<Drawing> drawings = drawingRepository.findAllByHomework(homework);
        List<TeacherDrawingResponse> drawingResponses = drawings.stream()
            .map(TeacherDrawingResponse::new)
            .collect(Collectors.toList());

        return new HomeworkReviewResponse(homework, textbookInfo, drawingResponses);
    }

    @Transactional
    public void saveHomework(Long homeworkId, List<MultipartFile> file, String page, Long MemberId) {
        Homework homework = findHomeworkById(homeworkId);

        ObjectMapper objectMapper = new ObjectMapper();
        List<Integer> pages = Collections.EMPTY_LIST;
        try {
            pages = objectMapper.readValue(page, new TypeReference<List<Integer>>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON parsing error");
        }

        for (int i = 0; i < file.size(); i++) {

            MultipartFile f = file.get(i);
            Integer p = pages.get(i);
            String fileName = homeworkId + "_" + f.getOriginalFilename() + "_" + p;
            String fileUrl = "";

            try {
                fileUrl = s3Upload.uploadFile(fileName, f.getInputStream(), f.getSize(), f.getContentType());
            } catch (IOException e) {
                e.printStackTrace();
                throw new S3UploadException();
            }

            Drawing homeworkDrawing = drawingRepository.findByHomeworkIdAndPage(homeworkId, p);

            if (homeworkDrawing != null) {
                homeworkDrawing.ongoingUpdate(fileUrl);
                drawingRepository.save(homeworkDrawing);
            } else {
                Drawing drawing = Drawing.builder()
                    .homework(homework)
                    .page(p)
                    .homeworkDrawingUrl(fileUrl)
                    .build();

                drawingRepository.save(drawing);
            }
        }
    }

    @Transactional
    public void saveHomeworkReview(Long homeworkId, List<MultipartFile> file, String page, Long MemberId) {
        Homework homework = findHomeworkById(homeworkId);

        ObjectMapper objectMapper = new ObjectMapper();
        List<Integer> pages = Collections.EMPTY_LIST;
        try {
            pages = objectMapper.readValue(page, new TypeReference<List<Integer>>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON parsing error");
        }

        for (int i = 0; i < file.size(); i++) {

            MultipartFile f = file.get(i);
            Integer p = pages.get(i);
            String fileName = homeworkId + "_" + f.getOriginalFilename() + "_" + p;
            String fileUrl = "";

            try {
                fileUrl = s3Upload.uploadFile(fileName, f.getInputStream(), f.getSize(), f.getContentType());
            } catch (IOException e) {
                e.printStackTrace();
                throw new S3UploadException();
            }

            Drawing homeworkDrawing = drawingRepository.findByHomeworkIdAndPage(homeworkId, p);

            if (homeworkDrawing != null) {
                homeworkDrawing.reviewUpdate(fileUrl);
                drawingRepository.save(homeworkDrawing);
            } else {
                Drawing drawing = Drawing.builder()
                    .homework(homework)
                    .page(p)
                    .reviewDrawingUrl(fileUrl)
                    .build();

                drawingRepository.save(drawing);
            }
        }
    }

    @Transactional
    public void submitHomework(Long homeworkId, Long MemberId) {
        Homework homework = findHomeworkById(homeworkId);

        validateHomeworkSubmission(homework);

        homework.submit();
    }

    @Transactional
    public void saveTeacherDrawing(Long homeworkId, List<MultipartFile> file, String page, Long MemberId) {
        Homework homework = findHomeworkById(homeworkId);

        ObjectMapper objectMapper = new ObjectMapper();
        List<Integer> pages = Collections.EMPTY_LIST;
        try {
            pages = objectMapper.readValue(page, new TypeReference<List<Integer>>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON parsing error");
        }

        for (int i = 0; i < file.size(); i++) {

            MultipartFile f = file.get(i);
            Integer p = pages.get(i);
            String fileName = homeworkId + "_" + f.getOriginalFilename() + "_" + p;
            String fileUrl = "";

            try {
                fileUrl = s3Upload.uploadFile(fileName, f.getInputStream(), f.getSize(), f.getContentType());
            } catch (IOException e) {
                e.printStackTrace();
                throw new S3UploadException();
            }

            Drawing homeworkDrawing = drawingRepository.findByHomeworkIdAndPage(homeworkId, p);

            if (homeworkDrawing != null) {
                homeworkDrawing.teacherUpdate(fileUrl);
                drawingRepository.save(homeworkDrawing);
            } else {
                Drawing drawing = Drawing.builder()
                    .homework(homework)
                    .page(p)
                    .reviewDrawingUrl(fileUrl)
                    .build();

                drawingRepository.save(drawing);
            }
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

    private void validateOwner(Member member, Homework homework) {
        if (!homework.isOwner(member)) {
            throw new AuthorizationException(member.getId());
        }
    }

    private void validateHomeworkUnconfirmed(Homework homework) {
        if (homework.getStatus() != HomeworkStatus.UNCONFIRMED) {
            throw new HomeworkStatusException();
        }
    }

    private void validateHomeworkSubmission(Homework homework) {
        if (homework.getStatus() == HomeworkStatus.COMPLETED) {
            throw new HomeworkAlreadySubmittedException();
        }
    }

    private void validateMemberInTutoring(Tutoring tutoring, Member member) {
        if (!tutoring.isMemberPartOfTutoring(member)) {
            throw new AuthorizationException(member.getId());
        }
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
    }

    private Tutoring findTutoringById(Long tutoringId) {
        return tutoringRepository.findByIdAndStatus(tutoringId, TutoringStatus.IN_PROGRESS)
            .orElseThrow(() -> new TutoringNotFoundException(tutoringId));
    }

    private Textbook findTextbookById(Long textbookId) {
        return textbookRepository.findByIdAndIsDeletedFalse(textbookId)
            .orElseThrow(() -> new TextbookNotFoundException(textbookId));
    }

    private Homework findHomeworkById(Long homeworkId) {
        return homeworkRepository.findByIdAndIsDeletedFalse(homeworkId)
            .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));
    }

    // URL 에서 fileKey 추출하는 메서드
    private String extractFileKey(String url) {
        String[] parts = url.split("/");
        if (parts.length > 3) {
            return String.join("/", Arrays.copyOfRange(parts, 3, parts.length));
        } else {
            return "";
        }
    }
}
