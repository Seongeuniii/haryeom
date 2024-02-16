package com.ioi.haryeom.tutoring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class TutoringScheduleRequest {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "과외 일자는 필수 항목입니다.")
    private LocalDate scheduleDate;

    @DateTimeFormat(pattern = "HH:mm[:ss]")
    @NotNull(message = "시작 시간은 필수 항목입니다.")
    private LocalTime startTime;

    @Positive(message = "진행 시간은 양수여야 합니다.")
    @NotNull(message = "진행 시간은 필수 항목입니다.")
    private Integer duration;

    @NotEmpty(message = "커리큘럼명은 필수 항목입니다. null이나 빈 문자열은 허용되지 않습니다.")
    private String title;

}
