package com.ioi.haryeom.homework.service;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.homework.dto.HomeworkListResponse;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.homework.repository.HomeworkRepository;
import com.ioi.haryeom.resource.repository.ResourceRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
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


    private int calculateProgressPercentage(Long tutoringId) {

        long totalHomeworkCount = homeworkRepository.countByTutoringId(tutoringId);
        long completedHomeworkCount = homeworkRepository.countByTutoringIdAndStatus(tutoringId, HomeworkStatus.COMPLETED);

        return (int) Math.round(((double) completedHomeworkCount / totalHomeworkCount) * 100);
    }

    private Tutoring findTutoringById(Long tutoringId) {
        return tutoringRepository.findById(tutoringId)
            .orElseThrow(() -> new TutoringNotFoundException(tutoringId));
    }
}
