package com.ioi.haryeom.member.dto;

import com.ioi.haryeom.common.domain.Subject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class SubjectResponse {

    private Long subjectId;
    private String name;

    public static SubjectResponse from(Subject subject) {
        return SubjectResponse.builder()
            .subjectId(subject.getId())
            .name(subject.getName())
            .build();
    }

}
