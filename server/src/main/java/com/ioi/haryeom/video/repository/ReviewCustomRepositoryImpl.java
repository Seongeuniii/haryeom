package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.homework.domain.HomeworkStatus;
import com.ioi.haryeom.video.dto.VideoResponseForQuery;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.TimePath;
import com.querydsl.jpa.JPAExpressions;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.Temporal;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Expr;
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
                    .select(homework.textbook.id)
                    .from(homework)
                    .where(homework.tutoring.id.in(
                        JPAExpressions
                            .select(tutoring.id)
                            .from(tutoring)
                            .where(tutoring.student.id.eq(memberId))
                    ), homework.status.eq(HomeworkStatus.COMPLETED))
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

    @Override
    public Page<VideoResponse> findAllBySubjectAndTutoringServiceByTutoringByMember(Long subjectId,
        Long memberId, Pageable pageable) {
        QueryResults<VideoResponseForQuery> results = queryFactory
            .select(
                Projections.constructor(VideoResponseForQuery.class,
                    video.id,video.tutoringSchedule.title,video.tutoringSchedule.scheduleDate,
                    video.startTime,video.endTime))
            .from(video)
            .leftJoin(video.tutoringSchedule, tutoringSchedule)
            .leftJoin(tutoringSchedule.tutoring, tutoring)
            .where(tutoring.subject.id.eq(subjectId),tutoring.student.id.eq(memberId))
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(video.createdAt.desc())
            .fetchResults();

        //content 옮겨담기 - second to HH:mm:ss
        List<VideoResponseForQuery> content = results.getResults();
        List<VideoResponse> response = new ArrayList<VideoResponse>();
        for(VideoResponseForQuery query:content){
            Long videoId = query.getVideoId();
            String title = query.getTitle();
            LocalDate scheduleDate = query.getScheduleDate();
            Long seconds = Duration.between(query.getStartTime(),query.getEndTime()).toSeconds();
            String duration = String.format("%02d:%02d:%02d",seconds/3600, (seconds%3600)/60, seconds%60);
            VideoResponse resp = new VideoResponse(videoId, title, scheduleDate, duration);
            response.add(resp);
        }
        Long total = results.getTotal();
        return new PageImpl<>(response, pageable, total);
    }

    private Long calculateDuration(TimePath<LocalTime> startTime, TimePath<LocalTime> endTime) {
        return Duration.between((Temporal) startTime, (Temporal) endTime).getSeconds();
    }
}
