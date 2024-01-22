package com.ioi.haryeom.homework.domain;

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
public class Drawing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "homework_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Homework homework;

    private Integer page;

    private String homeworkDrawingURL;

    private String reviewDrawingURL;

    private String teacherDrawingURL;

    @Builder
    public Drawing(Homework homework, Integer page, String homeworkDrawingURL,
        String reviewDrawingURL, String teacherDrawingURL) {
        this.homework = homework;
        this.page = page;
        this.homeworkDrawingURL = homeworkDrawingURL;
        this.reviewDrawingURL = reviewDrawingURL;
        this.teacherDrawingURL = teacherDrawingURL;
    }

    public void update(Homework homework, Integer page, String homeworkDrawingURL,
        String reviewDrawingURL, String teacherDrawingURL) {
        this.homework = homework;
        this.page = page;
        this.homeworkDrawingURL = homeworkDrawingURL;
        this.reviewDrawingURL = reviewDrawingURL;
        this.teacherDrawingURL = teacherDrawingURL;
    }
}
