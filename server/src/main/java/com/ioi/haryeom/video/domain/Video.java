package com.ioi.haryeom.video.domain;

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
    private TutoringSchedule tutoringSchedule;

    @Column(length = 2048)
    private String videoUrl;

    private LocalTime startTime;

    private LocalTime endTime;

    @Builder
    public Video(TutoringSchedule tutoringSchedule, LocalTime startTime, String videoUrl,
        LocalTime endTime) {
        this.tutoringSchedule = tutoringSchedule;
        this.startTime = startTime;
        this.videoUrl = videoUrl;
        this.endTime = endTime;
    }

    public void updateVideoEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public void updateVideoURL(String videoURL) {
        this.videoUrl = videoURL;
    }
}
