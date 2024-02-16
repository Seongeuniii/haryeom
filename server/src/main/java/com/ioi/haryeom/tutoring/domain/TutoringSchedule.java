package com.ioi.haryeom.tutoring.domain;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import java.time.LocalDate;
import java.time.LocalTime;
import javax.persistence.Column;
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

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TutoringSchedule extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "tutoring_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Tutoring tutoring;

    @Column
    private LocalDate scheduleDate;

    @Column
    private LocalTime startTime;

    @Column
    private Integer duration;

    @Column
    private String title;

    @Builder
    public TutoringSchedule(Tutoring tutoring, LocalDate scheduleDate, LocalTime startTime,
        Integer duration, String title) {
        this.tutoring = tutoring;
        this.scheduleDate = scheduleDate;
        this.startTime = startTime;
        this.duration = duration;
        this.title = title;
    }

    public void update(Tutoring tutoring, LocalDate scheduleDate, LocalTime startTime,
        Integer duration, String title) {
        this.tutoring = tutoring;
        this.scheduleDate = scheduleDate;
        this.startTime = startTime;
        this.duration = duration;
        this.title = title;
    }
}