package com.ioi.haryeom.member.dto;

import com.ioi.haryeom.common.domain.Subject;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SubjectInfo {

    @NotNull(message = "과외 ID는 필수 항목입니다.")
    private Long subjectId;

    @NotNull(message = "과외명은 필수 항목입니다.")
    private String name;

    public static SubjectInfo from(Subject subject) {
        return SubjectInfo.builder()
            .subjectId(subject.getId())
            .name(subject.getName())
            .build();
    }

}
