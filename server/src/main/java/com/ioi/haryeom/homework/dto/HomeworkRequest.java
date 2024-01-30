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
    @NotNull(message = "학습자료 ID는 필수 항목입니다.")
    private Long textbookId;

    @Positive
    @NotNull(message = "시작 페이지는 필수 항목입니다.")
    private Integer startPage;

    @Positive
    @NotNull(message = "끝 페이지는 필수 항목입니다.")
    private Integer endPage;

    @NotNull(message = "마감 기한은 필수 항목입니다.")
    private LocalDate deadline;
}
