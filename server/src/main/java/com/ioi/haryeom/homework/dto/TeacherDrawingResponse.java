package com.ioi.haryeom.homework.dto;

import com.ioi.haryeom.homework.domain.Drawing;
import lombok.Getter;

@Getter
public class TeacherDrawingResponse {

    private Long drawingId;

    private Integer page;

    private String homeworkDrawingUrl;

    private String reviewDrawingUrl;

    private String teacherDrawingUrl;

    public TeacherDrawingResponse(Drawing drawing) {
        this.drawingId = drawing.getId();
        this.page = drawing.getPage();
        this.homeworkDrawingUrl = drawing.getHomeworkDrawingURL();
        this.reviewDrawingUrl = drawing.getReviewDrawingURL();
        this.teacherDrawingUrl = drawing.getTeacherDrawingURL();
    }
}
