package com.ioi.haryeom.video.dto;

import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.domain.VideoTimestamp;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;

@Getter
public class VideoDetailResponse {
    private Long videoId;
    private String startTime;
    private String endTime;
    private String duration;
    private String videoUrl;
    private String teacherName;
    private String teacherProfileUrl;
    private String title;
    private String scheduleDate;
    private String subjectName;
    private List<VideoTimestampResponse> videoTimestampList;

    public VideoDetailResponse(Video video, TutoringSchedule tutoringSchedule, Member teacher, List<VideoTimestamp> videoTimestampList, Subject subject){
        this.videoId=video.getId();
        if(video.getStartTime()!=null) this.startTime= video.getStartTime().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        if(video.getEndTime() != null) this.endTime= video.getEndTime().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        if(video.getStartTime() != null && video.getEndTime() != null) {
            Long seconds = Duration.between(video.getStartTime(), video.getEndTime()).getSeconds();
            if(seconds<0) seconds+=60*60*24;
            this.duration = String.format("%02d:%02d:%02d",seconds/3600, (seconds%3600)/60, seconds%60);
        }
        this.videoUrl=video.getVideoUrl();

        this.title = tutoringSchedule.getTitle();
        this.scheduleDate = tutoringSchedule.getScheduleDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        this.subjectName = subject.getName();

        this.teacherName = teacher.getName();
        this.teacherProfileUrl = teacher.getProfileUrl();

        this.videoTimestampList = new ArrayList<>();

        for(VideoTimestamp timestamp : videoTimestampList){
            this.videoTimestampList.add(new VideoTimestampResponse(timestamp));
        }
    }
}
