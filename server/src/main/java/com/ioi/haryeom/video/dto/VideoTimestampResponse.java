package com.ioi.haryeom.video.dto;

import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.domain.VideoTimestamp;
import java.time.LocalTime;
import lombok.Getter;

@Getter
public class VideoTimestampResponse {
    private Long timestampId;
    private LocalTime stampTime;
    private String content;

    public VideoTimestampResponse(VideoTimestamp videoTimestamp){
        this.timestampId= videoTimestamp.getId();
        this.stampTime = videoTimestamp.getStampTime();
        this.content=videoTimestamp.getContent();
    }
}
