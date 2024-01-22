package com.ioi.haryeom.textbook.domain;

import com.ioi.haryeom.tutoring.domain.Tutoring;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "tutoring_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Tutoring tutoring;

    @JoinColumn(name = "textbook_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Textbook textbook;
}
