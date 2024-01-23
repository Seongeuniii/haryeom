package com.ioi.haryeom.vedio.domain;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import java.time.LocalTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Video extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutoring_schedule_id")
    private TutoringSchedule schedule; // 과외 일정과 1:1 mapping

    @Column(length = 2048)
    private String videoURL;

    private LocalTime startTime;

    private LocalTime endTime;

    @Builder
    public Video(TutoringSchedule schedule, LocalTime startTime, String videoURL,
        LocalTime endTime) {
        this.schedule = schedule;
        this.startTime = startTime;
        this.videoURL = videoURL;
        this.endTime = endTime;
    }

    public void updateVideoEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public void updateVideoURL(String videoURL) {
        this.videoURL = videoURL;
    }
}
