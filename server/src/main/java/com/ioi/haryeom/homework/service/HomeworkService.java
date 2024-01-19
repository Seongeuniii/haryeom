package com.ioi.haryeom.homework.service;

import com.ioi.haryeom.auth.dto.AuthInfo;
import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.HomeworkListResponse;
import com.ioi.haryeom.homework.dto.HomeworkRequest;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.exception.HomeworkNotFoundException;
import com.ioi.haryeom.homework.exception.HomeworkStatusException;
import com.ioi.haryeom.homework.exception.InvalidDeadlineException;
import com.ioi.haryeom.homework.exception.InvalidPageRangeException;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.member.domain.Role;
import com.ioi.haryeom.member.exception.NoTeacherException;
import com.ioi.haryeom.resource.domain.Resource;
import com.ioi.haryeom.resource.exception.ResourceNotFoundException;
import com.ioi.haryeom.resource.repository.ResourceRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class HomeworkService {

    private final HomeworkRepository homeworkRepository;
    private final ResourceRepository resourceRepository;

    private final TutoringRepository tutoringRepository;

    public HomeworkListResponse getHomeworkList(Long tutoringId, Integer page, Integer pageSize) {

        Tutoring tutoring = findTutoringById(tutoringId);

        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("createdAt").descending());
        Page<Homework> homeworkPage = homeworkRepository.findAllByTutoringId(tutoring.getId(), pageable);

        int progressPercentage = calculateProgressPercentage(tutoring.getId());

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

        Resource resource = findResourceById(request.getResourceId());

        validatePageRange(resource, request.getStartPage(), request.getEndPage());

        Homework homework = Homework.builder()
            .resource(resource)
            .tutoring(tutoring)
            .deadline(request.getDeadline())
            .startPage(request.getStartPage())
            .endPage(request.getEndPage())
            .build();

        Homework savedHomework = homeworkRepository.save(homework);
        return savedHomework.getId();
    }

    @Transactional
    public void updateHomework(Long tutoringId, Long homeworkId, HomeworkRequest request, AuthInfo authInfo) {

        validateTeacherRole(authInfo);
        validateDeadline(request.getDeadline());

        Homework homework = findHomeworkById(homeworkId);
        validateOwner(authInfo, homework);
        validateHomeworkUnconfirmed(homework);

        Tutoring tutoring = findTutoringById(tutoringId);

        Resource resource = findResourceById(request.getResourceId());
        validatePageRange(resource, request.getStartPage(), request.getEndPage());

        homework.update(resource, tutoring, request.getDeadline(), request.getStartPage(),
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

    private int calculateProgressPercentage(Long tutoringId) {

        long totalHomeworkCount = homeworkRepository.countByTutoringId(tutoringId);
        long completedHomeworkCount = homeworkRepository.countByTutoringIdAndStatus(tutoringId, HomeworkStatus.COMPLETED);

        return (int) Math.round(((double) completedHomeworkCount / totalHomeworkCount) * 100);
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

    private void validatePageRange(Resource resource, Integer startPage, Integer endPage) {
        if (startPage < 1 || endPage > resource.getTotalPage() || startPage > endPage) {
            throw new InvalidPageRangeException();
        }
    }

    private void validateOwner(AuthInfo authInfo, Homework homework) {
        if (!homework.isOwner(authInfo.getMemberId())) {
            throw new AuthorizationException();
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

    private Resource findResourceById(Long resourceId) {
        return resourceRepository.findById(resourceId)
            .orElseThrow(() -> new ResourceNotFoundException(resourceId));
    }

    private Homework findHomeworkById(Long homeworkId) {
        return homeworkRepository.findById(homeworkId)
            .orElseThrow(() -> new HomeworkNotFoundException(homeworkId));
    }
}
