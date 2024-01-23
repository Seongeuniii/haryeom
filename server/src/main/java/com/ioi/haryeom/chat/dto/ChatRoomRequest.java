package com.ioi.haryeom.chat.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatRoomRequest {

    @Positive
    @NotNull
    private Long teacherId;
}
