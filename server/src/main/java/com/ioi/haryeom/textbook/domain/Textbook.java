package com.ioi.haryeom.textbook.domain;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.member.domain.Member;
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

    // subjectId

    private String textbookName;

    private String textbookURL;

    private Boolean isFirstPageCover;

    private Integer totalPage;

    private String coverImg;

    private Boolean isDeleted = false;

    @Builder
    public Textbook(Member teacherMember, String textbookName, String textbookURL,
        Boolean isFirstPageCover, Integer totalPage, String coverImg) {
        this.teacherMember = teacherMember;
        this.textbookName = textbookName;
        this.textbookURL = textbookURL;
        this.isFirstPageCover = isFirstPageCover;
        this.totalPage = totalPage;
        this.coverImg = coverImg;
    }

    public void delete() {
        isDeleted = true;
    }
}
