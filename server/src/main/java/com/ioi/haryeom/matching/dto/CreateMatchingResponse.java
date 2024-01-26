package com.ioi.haryeom.matching.dto;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.member.domain.Member;
import lombok.Getter;

@Getter
public class CreateMatchingResponse {

    private String matchingId;
    private Long chatRoomId;
    private Long receiveMemberId;
    private String senderName;
    private SubjectResponse subject;
    private Integer hourlyRate;

    private CreateMatchingResponse(String matchingId, Long chatRoomId, Long receiveMemberId, String senderName,
        Subject subject, Integer hourlyRate) {
        this.matchingId = matchingId;
        this.chatRoomId = chatRoomId;
        this.receiveMemberId = receiveMemberId;
        this.senderName = senderName;
        this.subject = new SubjectResponse(subject);
        this.hourlyRate = hourlyRate;
    }

    public static CreateMatchingResponse of(String matchingId, ChatRoom chatRoom, Member member, Subject subject,
        Integer hourlyRate) {
        return new CreateMatchingResponse(
            matchingId,
            chatRoom.getId(),
            chatRoom.getOppositeMember(member).getId(),
            member.getName(),
            subject,
            hourlyRate
        );
    }

}
