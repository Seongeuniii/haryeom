package com.ioi.haryeom.matching.dto;

import java.util.List;
import javax.validation.constraints.Positive;
import lombok.Getter;
import reactor.util.annotation.Nullable;

@Getter
public class MatchingTeacherRequest {

    @Nullable
    private List<Long> subjectIds;

    @Nullable
    private List<String> colleges;

    @Nullable
    private String gender;

    @Positive
    @Nullable
    private Integer minCareer;

    @Positive
    @Nullable
    private Integer maxSalary;
}
