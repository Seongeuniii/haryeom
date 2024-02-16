package com.ioi.haryeom.matching.dto;

import java.util.List;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;
import reactor.util.annotation.Nullable;

@Setter
@Getter
public class MatchingTeacherRequest {

    @Nullable
    private List<Long> subjectIds;

    @Nullable
    private List<String> colleges;

    @Nullable
    private String gender;

    @PositiveOrZero(message = "최소 경력은 0 이상이여야합니다.")
    @Nullable
    private Integer minCareer;

    @Positive(message = "최대 연봉은 0보다 커야 합니다.")
    @Nullable
    private Integer maxSalary;
}
