package com.ioi.haryeom.homework.dto;

import com.ioi.haryeom.homework.domain.Drawing;
import lombok.Getter;

@Getter
public class StudentDrawingResponse {

    private Long drawingId;

    private Integer page;

    private String homeworkDrawingUrl;

    public StudentDrawingResponse(Drawing drawing) {
        this.drawingId = drawing.getId();
        this.page = drawing.getPage();
        this.homeworkDrawingUrl = drawing.getHomeworkDrawingUrl();
    }
}
