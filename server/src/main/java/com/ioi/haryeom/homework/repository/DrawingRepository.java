package com.ioi.haryeom.homework.repository;

import com.ioi.haryeom.homework.domain.Drawing;
import com.ioi.haryeom.homework.domain.Homework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {

    List<Drawing> findAllByHomework(Homework homework);

}
