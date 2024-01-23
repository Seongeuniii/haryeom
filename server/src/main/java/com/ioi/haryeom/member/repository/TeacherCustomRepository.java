package com.ioi.haryeom.member.repository;

import com.ioi.haryeom.member.domain.Teacher;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface TeacherCustomRepository {

    List<Teacher> findAllByTeacherConditions(List<Long> subjectIds, List<String> colleges, String gender,
        Integer minCareer, Integer maxSalary, Pageable pageable);
}
