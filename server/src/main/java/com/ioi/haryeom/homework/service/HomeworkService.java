package com.ioi.haryeom.homework.service;

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
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class HomeworkService {

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

    public HomeworkNewLoadResponse getNewHomework(Long homeworkId, AuthInfo authInfo) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));

        Textbook textbook = homework.getTextbook();
        TextbookResponse textbookInfo = new TextbookResponse(textbook);

        return new HomeworkNewLoadResponse(homework, textbookInfo);
    }

    public HomeworkOngoingLoadResponse getOngoingHomework(Long homeworkId, AuthInfo authInfo) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));

        Textbook textbook = homework.getTextbook();
        TextbookResponse textbookInfo = new TextbookResponse(textbook);

        List<Drawing> drawings =  drawingRepository.findAllByHomework(homework);
        List<StudentDrawingResponse> drawingResponses = drawings.stream()
                .map(StudentDrawingResponse::new)
                .collect(Collectors.toList());

        return new HomeworkOngoingLoadResponse(homework, textbookInfo, drawingResponses);

    }

    public HomeworkReviewResponse getReviewHomework(Long homeworkId, AuthInfo authInfo) {
        Homework homework = homeworkRepository.findById(homeworkId)
                .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));

        Textbook textbook = homework.getTextbook();
        TextbookResponse textbookInfo = new TextbookResponse(textbook);

        List<Drawing> drawings = drawingRepository.findAllByHomework(homework);
        List<TeacherDrawingResponse> drawingResponses = drawings.stream()
                .map(TeacherDrawingResponse::new)
                .collect(Collectors.toList());

        return new HomeworkReviewResponse(homework, textbookInfo, drawingResponses);
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
}
