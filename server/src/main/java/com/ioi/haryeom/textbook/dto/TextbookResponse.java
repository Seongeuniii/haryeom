package com.ioi.haryeom.textbook.dto;

import com.ioi.haryeom.textbook.domain.Textbook;
import lombok.Getter;

@Getter
public class TextbookResponse {

    private Long textbookId;
    private String textbookName;
    private String textbookUrl;
    private Integer totalPage;

    public TextbookResponse(Textbook textbook){
        this.textbookId = textbook.getId();
        this.textbookName = textbook.getTextbookName();
        this.textbookUrl = textbook.getTextbookUrl();
        this.totalPage = textbook.getTotalPage();

    }
}
