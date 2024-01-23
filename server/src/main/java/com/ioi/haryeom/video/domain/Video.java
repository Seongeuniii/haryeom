package com.ioi.haryeom.video.domain;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import java.time.LocalTime;
import javax.persistence.Column;
import javax.persistence.Convert;
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
import lombok.ToString;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.LocalTimeConverter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@ToString
public class Video extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutoring_schedule_id")
    private TutoringSchedule tutoringSchedule; // 과외 일정과 1:1 mapping

    @Column(length = 2048, name="video_url")
    private String videoURL;


//    @Convert(converter = LocalTimeConverter.class)
    private LocalTime startTime;


//    @Convert(converter = LocalTimeConverter.class)
    private LocalTime endTime;

    @Builder
    public Video(TutoringSchedule tutoringSchedule, LocalTime startTime, String videoURL,
        LocalTime endTime) {
        this.tutoringSchedule = tutoringSchedule;
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
