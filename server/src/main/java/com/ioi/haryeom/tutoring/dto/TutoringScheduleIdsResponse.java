package com.ioi.haryeom.tutoring.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class TutoringScheduleIdsResponse {

    private List<Long> tutoringScheduleIds;

    public TutoringScheduleIdsResponse(List<Long> tutoringScheduleIds) {
        this.tutoringScheduleIds = tutoringScheduleIds;
    }
}
