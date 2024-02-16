package com.ioi.haryeom.textbook.dto;

import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.textbook.domain.Textbook;
import lombok.Getter;

import java.util.List;

@Getter
public class TextbookWithStudentsResponse {

    private Long textbookId;
    private String textbookName;
    private Boolean firstPageCover;
    private List<StudentInfo> students;

    public static class StudentInfo {
        private Long memberId;
        private String profileUrl;
        private String name;

        public Long getMemberId() {
            return memberId;
        }

        public String getProfileUrl() {
            return profileUrl;
        }

        public String getName() {
            return name;
        }

        public StudentInfo(){}

        public StudentInfo(Member member) {
            this.memberId = member.getId();
            this.profileUrl = member.getProfileUrl();
            this.name = member.getName();
        }
    }

    public TextbookWithStudentsResponse(Textbook textbook, List<StudentInfo> students) {
        this.textbookId = textbook.getId();
        this.textbookName = textbook.getTextbookName();
        this.firstPageCover = textbook.getFirstPageCover();
        this.students = students;
    }
}
