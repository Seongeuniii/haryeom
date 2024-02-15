package com.ioi.haryeom.setttlement.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class SettlementResponse {

    private List<ScheduleProgressResponse> scheduleProgresses;
    private Integer scheduleCount;
    private Integer hourlyRate;
    private Integer totalProgressTimeInMinutes;
    private Integer tutoringFee;

    public SettlementResponse(List<ScheduleProgressResponse> scheduleProgresses, Integer scheduleCount, Integer hourlyRate,
        Integer totalProgressTimeInMinutes, Integer tutoringFee) {
        this.scheduleProgresses = scheduleProgresses;
        this.scheduleCount = scheduleCount;
        this.hourlyRate = hourlyRate;
        this.totalProgressTimeInMinutes = totalProgressTimeInMinutes;
        this.tutoringFee = tutoringFee;
    }
}
