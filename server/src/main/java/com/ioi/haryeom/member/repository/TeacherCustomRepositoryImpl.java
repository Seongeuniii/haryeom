package com.ioi.haryeom.member.repository;


import static com.ioi.haryeom.member.domain.QTeacher.teacher;
import static com.ioi.haryeom.member.domain.QTeacherSubject.teacherSubject;

import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.domain.type.Gender;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TeacherCustomRepositoryImpl implements TeacherCustomRepository {

    //Querydsl을 사용하여 JPA 쿼리를 생성하고 실행하기 위한 클래스
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Teacher> findAllByTeacherConditions(List<Long> subjectIds, List<String> colleges, String gender,
        Integer minCareer, Integer maxSalary, Pageable pageable) {

        return queryFactory
            .selectFrom(teacher)
            .leftJoin(teacher.teacherSubjects, teacherSubject)
            .where(
                profileStatusTrue(),
                inColleges(colleges),
                inSubjectIds(subjectIds),
                eqGender(gender),
                gtMinCareer(minCareer),
                ltMaxSalary(maxSalary)
            )
            .groupBy(teacher.id)
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .orderBy(teacher.createdAt.desc())
            .fetch();
    }

    private BooleanExpression profileStatusTrue() {
        return teacher.profileStatus.isTrue();
    }

    private BooleanExpression inSubjectIds(List<Long> subjectIds) {
        if (subjectIds == null) {
            return null;
        }

        return teacherSubject.subject.id.in(subjectIds);
    }


    private BooleanExpression eqGender(String gender) {
        if (StringUtils.isBlank(gender)) {
            return null;
        }
        return teacher.gender.eq(Gender.valueOf(gender));
    }

    private BooleanExpression gtMinCareer(Integer minCareer) {
        if (minCareer == null) {
            return null;
        }
        return teacher.career.gt(minCareer);
    }

    private BooleanExpression ltMaxSalary(Integer maxSalary) {
        if (maxSalary == null) {
            return null;
        }
        return teacher.salary.lt(maxSalary);
    }

    private BooleanExpression inColleges(List<String> colleges) {
        if (colleges == null) {
            return null;
        }
        return teacher.college.in(colleges);
    }
}
