package com.ioi.haryeom.tutoring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class TutoringScheduleDuplicateCheckRequest {

    @Positive(message = "과외 ID는 양수입니다.")
    @NotNull(message = "과외 ID는 필수입니다.")
    private Long tutoringId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "과외 일자는 필수 항목입니다.")
    private LocalDate scheduleDate;

    @DateTimeFormat(pattern = "HH:mm[:ss]")
    @NotNull(message = "시작 시간은 필수 항목입니다.")
    private LocalTime startTime;

    @Positive(message = "진행 시간은 양수여야 합니다.")
    @NotNull(message = "진행 시간은 필수 항목입니다.")
    private Integer duration;

}
