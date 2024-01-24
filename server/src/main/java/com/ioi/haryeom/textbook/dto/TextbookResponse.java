package com.ioi.haryeom.textbook.dto;

import com.ioi.haryeom.textbook.domain.Textbook;
import lombok.Getter;

@Getter
public class TextbookResponse {

    private Long textbookId;
    private String textbookName;
    private String textbookURL;
    private Integer totalPage;

    public TextbookResponse(Textbook textbook){
        this.textbookId = textbook.getId();
        this.textbookName = textbook.getTextbookName();
        this.textbookURL = textbook.getTextbookURL();
        this.totalPage = textbook.getTotalPage();

    }
}
