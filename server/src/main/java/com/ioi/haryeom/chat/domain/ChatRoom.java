package com.ioi.haryeom.chat.domain;

import com.ioi.haryeom.common.domain.BaseTimeEntity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ChatRoom extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean isDeleted = false;

    @Builder
    public ChatRoom(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public void update(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
