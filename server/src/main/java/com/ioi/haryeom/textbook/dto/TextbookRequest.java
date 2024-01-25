package com.ioi.haryeom.textbook.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class TextbookRequest {

    @NotNull
    private Long teacherMemberId;
    @NotNull
    private Long subjectId;
    @NotNull
    private String textbookName;
    @NotNull
    private boolean firstPageCover;
    @NotNull
    private Integer totalPage;

}
