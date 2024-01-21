package com.ioi.haryeom.homework.dto;

import java.time.LocalDate;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomeworkRequest {

    @NotNull
    private Long resourceId;
    @NotNull
    private Integer startPage;
    @NotNull
    private Integer endPage;
    @NotNull
    private LocalDate deadline;
}
