package com.ioi.haryeom.homework.dto;

import com.ioi.haryeom.homework.domain.Homework;
import com.ioi.haryeom.textbook.dto.TextbookResponse;
import lombok.Getter;

import java.util.List;

@Getter
public class HomeworkReviewResponse {

    private Long homeworkId;
    private Integer startPage;
    private Integer endPage;
    private TextbookResponse textbook;
    private List<TeacherDrawingResponse> drawings;

    public HomeworkReviewResponse(Homework homework, TextbookResponse textbook, List<TeacherDrawingResponse> drawings) {
        this.homeworkId = homework.getId();
        this.startPage = homework.getStartPage();
        this.endPage = homework.getEndPage();
        this.textbook = textbook;
        this.drawings = drawings;
    }

}
