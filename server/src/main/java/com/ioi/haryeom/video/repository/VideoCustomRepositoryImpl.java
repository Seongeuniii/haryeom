package com.ioi.haryeom.video.repository;

import static com.ioi.haryeom.video.domain.QVideo.video;
import static com.ioi.haryeom.tutoring.domain.QTutoring.tutoring;
import static com.ioi.haryeom.tutoring.domain.QTutoringSchedule.tutoringSchedule;

import com.ioi.haryeom.video.dto.VideoListResponseDto;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class VideoCustomRepositoryImpl implements  VideoCustomRepository{

    private final JPAQueryFactory queryFactory;
    @Override
    public List<VideoListResponseDto> findAllBySubjectIdAndMemberId(Long subjectId, Long memberId) {
        return queryFactory
                .select(
                        Projections.constructor(VideoListResponseDto.class,
                                video.id,
                                Expressions.stringTemplate("SEC_TO_TIME(TIMESTAMPDIFF(SECOND, {0}, {1}))",
                                        video.startTime, video.endTime),
                                tutoringSchedule.scheduleDate,
                                tutoringSchedule.title))
                .from(video)
                .leftJoin(tutoringSchedule).on(video.tutoringSchedule.id.eq(tutoringSchedule.id))
                .fetchJoin()
                .leftJoin(tutoring).on(tutoringSchedule.tutoring.id.eq(tutoring.id))
                .fetchJoin()
                .where(tutoring.subject.id.eq(subjectId)
                        .and(tutoring.student.id.eq(memberId)))
                .fetch();
    }
}
