package com.ioi.haryeom.textbook.dto;

import com.ioi.haryeom.textbook.domain.Textbook;
import lombok.Getter;

@Getter
public class TextbookListByTutoringResponse {

    private Long textbookId;
    private String textbookName;
    private Boolean firstPageCover;
    private String coverImg;

    public TextbookListByTutoringResponse(Textbook textbook) {
        this.textbookId = textbook.getId();
        this.textbookName = textbook.getTextbookName();
        this.firstPageCover = textbook.getFirstPageCover();
        this.coverImg = textbook.getCoverImg();
    }


}
