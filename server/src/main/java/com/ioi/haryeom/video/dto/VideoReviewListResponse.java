package com.ioi.haryeom.video.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class VideoReviewListResponse {
    private List<VideoResponse> videoList;
    private Integer totalPages;

    public VideoReviewListResponse(List<VideoResponse> videoList, Integer totalPages){
        this.videoList=videoList;
        this.totalPages=totalPages;
    }
}
