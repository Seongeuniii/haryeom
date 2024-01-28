package com.ioi.haryeom.homework.repository;

import static com.ioi.haryeom.tutoring.domain.QTutoring.tutoring;
import static com.ioi.haryeom.textbook.domain.QTextbook.textbook;
import static com.ioi.haryeom.homework.domain.QHomework.homework;

import com.ioi.haryeom.homework.domain.Homework;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class HomeworkCustomRepositoryImpl implements HomeworkCustomRepository{

    private final JPAQueryFactory queryFactory;

    //tuple 대신 dto로 바꾸기
    @Override
    public List<Homework> findHomeworkListBySubjectIdAndMemberId(Long textbookId, Long memberId) {
        return queryFactory
                .selectFrom(homework)
                .leftJoin(tutoring)
                .on(tutoring.student.id.eq(memberId))
                .groupBy(homework.id)
                .where(homework.textbook.id.eq(textbookId))
                .fetch();
    }
}
