package com.ioi.haryeom.tutoring.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class TutoringScheduleIdsResponse {

    private List<Integer> tutoringScheduleIds;

    public TutoringScheduleIdsResponse(List<Integer> tutoringScheduleIds) {
        this.tutoringScheduleIds = tutoringScheduleIds;
    }
}
