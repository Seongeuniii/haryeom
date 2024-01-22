package com.ioi.haryeom.homework.dto;

import com.ioi.haryeom.homework.domain.Homework;
import java.time.LocalDate;
import lombok.Getter;


@Getter
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

