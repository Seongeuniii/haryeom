package com.ioi.haryeom.tutoring.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TutoringScheduleRequest {

    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}", message = "과외 일자의 형식은 yyyy-MM-dd 여야 합니다.")
    @NotNull(message = "과외 일자는 필수 항목입니다.")
    private LocalDate scheduleDate;

    @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$", message = "올바른 시간 형식이 아닙니다.")
    @NotNull(message = "시작 시간은 필수 항목입니다.")
    private LocalTime startTime;

    @Positive(message = "진행 시간은 양수여야 합니다.")
    @NotNull(message = "진행 시간은 필수 항목입니다.")
    private Integer duration;

    @NotEmpty(message = "커리큘럼명은 필수 항목입니다. null이나 빈 문자열은 허용되지 않습니다.")
    private String title;

}
