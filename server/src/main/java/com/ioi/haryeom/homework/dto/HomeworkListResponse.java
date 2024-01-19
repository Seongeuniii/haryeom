package com.ioi.haryeom.homework.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class HomeworkListResponse {

    private final List<HomeworkResponse> homeworkList;

    private Integer progressPercentage;

    public HomeworkListResponse(List<HomeworkResponse> homeworkList, Integer progressPercentage) {
        this.homeworkList = homeworkList;
        this.progressPercentage = progressPercentage;
    }
}
