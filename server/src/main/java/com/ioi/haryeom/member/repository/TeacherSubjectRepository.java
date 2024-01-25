package com.ioi.haryeom.member.repository;

import com.ioi.haryeom.member.domain.TeacherSubject;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherSubjectRepository extends JpaRepository<TeacherSubject, Long> {

    List<TeacherSubject> findByTeacherId(Long teacherId);
}
