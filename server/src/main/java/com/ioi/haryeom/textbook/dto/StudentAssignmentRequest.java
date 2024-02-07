package com.ioi.haryeom.textbook.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudentAssignmentRequest {

    private List<Long> studentMemberIds;
}
