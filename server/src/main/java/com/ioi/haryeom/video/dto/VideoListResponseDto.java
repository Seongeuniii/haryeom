package com.ioi.haryeom.video.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class VideoListResponseDto {
    Long videoId;
    String title;
    String scheduleDate;
    String duration;
}
