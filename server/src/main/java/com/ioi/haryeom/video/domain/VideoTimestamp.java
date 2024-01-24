package com.ioi.haryeom.video.domain;

import java.time.LocalTime;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.LocalTimeConverter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class VideoTimestamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;


//    @Convert(converter = LocalTimeConverter.class)
    private LocalTime stampTime;

    @Column(length = 100)
    private String content;

    @Builder
    public VideoTimestamp(Video video, LocalTime stampTime, String content) {
        this.video = video;
        this.stampTime = stampTime;
        this.content = content;
    }

    public void update(LocalTime stampTime, String content) {
        this.stampTime = stampTime;
        this.content = content;
    }
}
