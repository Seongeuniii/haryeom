package com.ioi.haryeom.video.dto;

import com.ioi.haryeom.video.domain.Video;
import java.time.format.DateTimeFormatter;
import lombok.Getter;

@Getter
public class VideoDetailResponse {
    private Long videoId;
    private String startTime;
    private String endTime;
    private String videoUrl;

    public VideoDetailResponse(Video video){
        this.videoId=video.getId();
        this.startTime= video.getStartTime().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        this.endTime= video.getEndTime().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        this.videoUrl=video.getVideoUrl();
    }
}
