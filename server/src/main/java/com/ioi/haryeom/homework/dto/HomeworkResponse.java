package com.ioi.haryeom.homework.dto;

import com.ioi.haryeom.homework.domain.Homework;
import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@AllArgsConstructor
public class HomeworkResponse {

    private Long homeworkId;
    private Long textbookId;

    private String textbookName;
    private Integer startPage;
    private Integer endPage;
    private String status;
    private LocalDate deadline;

    public HomeworkResponse(Homework homework) {
        this.homeworkId = homework.getId();
        this.textbookId = homework.getTextbook().getId();
        this.textbookName = homework.getTextbook().getTextbookName();
        this.startPage = homework.getStartPage();
        this.endPage = homework.getEndPage();
        this.status = String.valueOf(homework.getStatus());
        this.deadline = homework.getDeadline();
    }

}

