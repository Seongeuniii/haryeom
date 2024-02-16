package com.ioi.haryeom.video.dto;

import com.ioi.haryeom.homework.dto.HomeworkResponse;
import java.util.List;
import lombok.Getter;

@Getter
public class HomeworkReviewListResponse {
    private List<HomeworkResponse> homeworkList;
    private Integer totalPages;

    public HomeworkReviewListResponse(List<HomeworkResponse> homeworkList, Integer totalPages){
        this.homeworkList=homeworkList;
        this.totalPages=totalPages;
    }
}
