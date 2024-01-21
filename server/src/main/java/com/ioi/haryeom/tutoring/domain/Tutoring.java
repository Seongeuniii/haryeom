package com.ioi.haryeom.tutoring.domain;

import static com.ioi.haryeom.tutoring.domain.TutoringStatus.REQUESTED;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.common.domain.BaseTimeEntity;
import com.ioi.haryeom.member.domain.Member;
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
public class Tutoring extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "chat_room_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom;

    private String subject;

    private Integer hourlyRate;

    @Enumerated(EnumType.STRING)
    private TutoringStatus status = REQUESTED;

    @JoinColumn(name = "student_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member student;

    @JoinColumn(name = "teacher_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member teacher;


    @Builder
    public Tutoring(ChatRoom chatRoom, String subject, Integer hourlyRate, TutoringStatus status,
        Member student,
        Member teacher) {
        this.chatRoom = chatRoom;
        this.subject = subject;
        this.hourlyRate = hourlyRate;
        this.status = status;
        this.student = student;
        this.teacher = teacher;
    }

    public void update(ChatRoom chatRoom, String subject, Integer hourlyRate, TutoringStatus status,
        Member student,
        Member teacher) {
        this.chatRoom = chatRoom;
        this.subject = subject;
        this.hourlyRate = hourlyRate;
        this.status = status;
        this.student = student;
        this.teacher = teacher;
    }
}

