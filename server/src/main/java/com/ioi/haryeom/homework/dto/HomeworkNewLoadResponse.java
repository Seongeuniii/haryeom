package com.ioi.haryeom.homework.dto;


import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import lombok.Getter;

import java.util.List;

@Getter
public class HomeworkNewLoadResponse {

    private Long homeworkId;
    private Integer startPage;
    private Integer endPage;
    private TextbookResponse textbook;

    public HomeworkNewLoadResponse(Homework homework, TextbookResponse textbook) {
        this.homeworkId = homework.getId();
        this.startPage = homework.getStartPage();
        this.endPage = homework.getEndPage();
        this.textbook = textbook;
    }


}
