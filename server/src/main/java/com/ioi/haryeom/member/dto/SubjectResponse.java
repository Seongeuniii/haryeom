package com.ioi.haryeom.member.dto;

import com.ioi.haryeom.common.domain.Subject;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SubjectResponse {

    @NotNull(message = "과외 ID는 필수 항목입니다.")
    private Long subjectId;

    @NotNull(message = "과외명은 필수 항목입니다.")
    private String name;

    public static SubjectResponse from(Subject subject) {
        return SubjectResponse.builder()
            .subjectId(subject.getId())
            .name(subject.getName())
            .build();
    }

}
