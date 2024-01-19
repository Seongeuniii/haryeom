package com.ioi.haryeom.homework.domain;


import static com.ioi.haryeom.homework.domain.HomeworkStatus.UNCONFIRMED;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.resource.domain.Resource;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import java.time.LocalDate;
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

    @JoinColumn(name = "resource_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Resource resource;

    @JoinColumn(name = "tutoring_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Tutoring tutoring;

    private LocalDate deadline;

    private Integer startPage;

    private Integer endPage;

    @Enumerated(EnumType.STRING)
    private HomeworkStatus status = UNCONFIRMED;

    private Boolean isDeleted = false;

    @Builder
    public Homework(Resource resource, Tutoring tutoring, LocalDate deadline,
        Integer startPage, Integer endPage) {
        this.resource = resource;
        this.tutoring = tutoring;
        this.deadline = deadline;
        this.startPage = startPage;
        this.endPage = endPage;
    }

    public void update(Resource resource, Tutoring tutoring, LocalDate deadline,
        Integer startPage, Integer endPage) {
        this.resource = resource;
        this.tutoring = tutoring;
        this.deadline = deadline;
        this.startPage = startPage;
        this.endPage = endPage;
    }

    public void delete() {
        isDeleted = true;
    }

    public boolean isOwner(Long accessMemberId) {
        if (accessMemberId == null) {
            return false;
        }

        return resource.getMember().getId().equals(accessMemberId);
    }
}
