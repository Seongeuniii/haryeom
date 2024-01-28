package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.TimePath;
import com.querydsl.jpa.JPAExpressions;
import java.time.Duration;
import java.time.LocalTime;
import java.time.temporal.Temporal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Repository;

import static com.ioi.haryeom.common.domain.QSubject.subject;
import static com.ioi.haryeom.homework.domain.QHomework.homework;
import static com.ioi.haryeom.textbook.domain.QTextbook.textbook;
import static com.ioi.haryeom.textbook.domain.QAssignment.assignment;
import static com.ioi.haryeom.tutoring.domain.QTutoring.tutoring;
import static com.ioi.haryeom.video.domain.QVideo.video;
import static com.ioi.haryeom.tutoring.domain.QTutoringSchedule.tutoringSchedule;

import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.homework.dto.HomeworkResponse;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import com.ioi.haryeom.video.dto.VideoResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
@RequiredArgsConstructor
public class ReviewCustomRepositoryImpl implements ReviewCustomRepository{
    private final JPAQueryFactory queryFactory;


    @Override
    public List<TextbookResponse> findAllByAssignmentByTutoringByMember(Long memberId) {
        return queryFactory
            .select(
                Projections.constructor(TextbookResponse.class,
                    textbook.id.as("textbookId"), textbook.textbookName, textbook.textbookUrl, textbook.totalPage)
            ).from(textbook)
            .where(textbook.id.in(
                JPAExpressions
                    .select(assignment.textbook.id)
                    .from(assignment)
                    .where(assignment.tutoring.id.in(
                        JPAExpressions
                            .select(tutoring.id)
                            .from(tutoring)
                            .where(tutoring.student.id.eq(memberId))
                    ))
            ))
            .fetch();
    }

    @Override
    public Page<HomeworkResponse> findAllByTextbookByTutoringByMember(Long textbookId,
        Long memberId, Pageable pageable) {
        QueryResults<HomeworkResponse> results = queryFactory
            .select(
                Projections.constructor(HomeworkResponse.class,
                    homework.id, homework.textbook.id,
                    homework.textbook.textbookName, homework.startPage, homework.endPage, homework.status.stringValue(), homework.deadline)
            ).from(homework)
            .leftJoin(textbook).on(textbook.id.eq(homework.textbook.id))
            .fetchJoin()
            .where(textbook.id.eq(textbookId),homework.tutoring.student.id.eq(memberId), homework.status.eq(HomeworkStatus.COMPLETED))
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(homework.deadline.desc())
            .fetchResults();
        List<HomeworkResponse> content = results.getResults();
        Long total = results.getTotal();

        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public List<SubjectResponse> findAllByTutoringByMember(Long memberId) {

        return queryFactory
            .select(Projections.constructor(SubjectResponse.class,
                subject.id.as("subjectId"), subject.name))
            .from(subject)
            .where(subject.id.in(
                JPAExpressions
                    .select(tutoring.subject.id)
                    .from(tutoring)
                    .where(tutoring.student.id.eq(memberId))
            ))
            .fetch();
    }

//    @Override
//    public Page<VideoResponse> findAllBySubjectAndTutoringServiceByTutoringByMember(Long subjectId,
//        Long memberId, Pageable pageable) {
//        QueryResults<VideoResponse> results = queryFactory
//            .select(
//                Projections.constructor(VideoResponse.class,
//                    video.id,video.tutoringSchedule.title,video.tutoringSchedule.scheduleDate,
//                    Expressions.stringTemplate("SEC_TO_TIME({0})",
//                            calculateDuration(video.startTime,video.endTime)).stringValue()))
//            .from(video)
//            .leftJoin(video.tutoringSchedule, tutoringSchedule)
//            .leftJoin(tutoringSchedule.tutoring, tutoring)
//            .where(tutoring.subject.id.eq(subjectId),tutoring.student.id.eq(memberId))
//            .offset(pageable.getOffset())
//            .limit(pageable.getPageSize())
//            .orderBy(video.createdAt.desc())
//            .fetchResults();
//
//        List<VideoResponse> content = results.getResults();
//        Long total = results.getTotal();
//        return new PageImpl<>(content, pageable, total);
//    }
    private Long calculateDuration(TimePath<LocalTime> startTime, TimePath<LocalTime> endTime) {
        return Duration.between((Temporal) startTime, (Temporal) endTime).getSeconds();
    }
}
