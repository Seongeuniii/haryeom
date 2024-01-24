package com.ioi.haryeom.homework.domain;


import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.textbook.domain.Textbook;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
public class Homework extends BaseTimeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "textbook_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Textbook textbook;

    @JoinColumn(name = "tutoring_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Tutoring tutoring;

    private LocalDate deadline;

    private Integer startPage;

    private Integer endPage;

    @Enumerated(EnumType.STRING)
    private HomeworkStatus status = HomeworkStatus.UNCONFIRMED;

    @Column(columnDefinition = "TINYINT(1)")
    private Boolean isDeleted = false;

    @Builder
    public Homework(Textbook textbook, Tutoring tutoring, LocalDate deadline,
        Integer startPage, Integer endPage) {
        this.textbook = textbook;
        this.tutoring = tutoring;
        this.deadline = deadline;
        this.startPage = startPage;
        this.endPage = endPage;
    }

    public void update(Textbook textbook, Tutoring tutoring, LocalDate deadline,
        Integer startPage, Integer endPage) {
        this.textbook = textbook;
        this.tutoring = tutoring;
        this.deadline = deadline;
        this.startPage = startPage;
        this.endPage = endPage;
    }

    public void delete() {
        isDeleted = true;
    }

    public void submit() {
        this.status = HomeworkStatus.COMPLETED;
    }

    public boolean isOwner(Long accessMemberId) {
        if (accessMemberId == null) {
            return false;
        }

        return textbook.getTeacherMember().getId().equals(accessMemberId);
    }
}
