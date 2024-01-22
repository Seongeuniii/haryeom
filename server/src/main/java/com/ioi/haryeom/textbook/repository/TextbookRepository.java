package com.ioi.haryeom.textbook.repository;

import com.ioi.haryeom.textbook.domain.Textbook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TextbookRepository extends JpaRepository<Textbook, Long> {

}
