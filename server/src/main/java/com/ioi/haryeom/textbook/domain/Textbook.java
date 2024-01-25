package com.ioi.haryeom.textbook.domain;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.member.domain.Member;
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

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Textbook extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "teacher_member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member teacherMember;

    @JoinColumn(name = "subject_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Subject subject;

    private String textbookName;

    private String textbookUrl;

    private Boolean firstPageCover;

    private Integer totalPage;

    private String coverImg;

    @Column(columnDefinition = "TINYINT(1)")
    private Boolean isDeleted = false;

    @Builder
    public Textbook(Member teacherMember, Subject subject,String textbookName, String textbookUrl,
        Boolean firstPageCover, Integer totalPage, String coverImg) {
        this.teacherMember = teacherMember;
        this.subject = subject;
        this.textbookName = textbookName;
        this.textbookUrl = textbookUrl;
        this.firstPageCover = firstPageCover;
        this.totalPage = totalPage;
        this.coverImg = coverImg;
    }

    public void delete() {
        isDeleted = true;
    }
}
