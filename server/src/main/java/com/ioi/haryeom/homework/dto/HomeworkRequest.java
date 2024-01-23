package com.ioi.haryeom.homework.dto;

import java.time.LocalDate;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomeworkRequest {

    @Positive
    @NotNull
    private Long textbookId;
    @Positive
    @NotNull
    private Integer startPage;
    @Positive
    @NotNull
    private Integer endPage;
    @NotNull
    private LocalDate deadline;
}
