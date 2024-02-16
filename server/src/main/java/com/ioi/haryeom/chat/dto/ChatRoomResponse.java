package com.ioi.haryeom.chat.dto;

import com.ioi.haryeom.chat.document.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.type.Role;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ChatRoomResponse {

    private final Long chatRoomId;
    private final OppositeMemberResponse oppositeMember;
    private final String lastMessage;
    private final LocalDateTime lastMessageCreatedAt;
    private final Integer unreadMessageCount;

    private ChatRoomResponse(Long chatRoomId, OppositeMemberResponse oppositeMember, String lastMessage,
        LocalDateTime lastMessageCreatedAt, Integer unreadMessageCount) {
        this.chatRoomId = chatRoomId;
        this.oppositeMember = oppositeMember;
        this.lastMessage = lastMessage;
        this.lastMessageCreatedAt = lastMessageCreatedAt;
        this.unreadMessageCount = unreadMessageCount;
    }

    public static ChatRoomResponse of(ChatRoom chatRoom, ChatMessage lastChatMessage, Member oppositeMember,
        Integer unreadMessageCount) {

        OppositeMemberResponse oppositeMemberResponse = new OppositeMemberResponse(oppositeMember);

        String lastMessage = (lastChatMessage != null) ? lastChatMessage.getContent() : null;

        // 마지막 메시지가 없는 경우 채팅방 생성된 시간을 기준으로 한다.
        LocalDateTime lastMessageCreatedAt = (lastChatMessage != null) ? lastChatMessage.getCreatedAt() : chatRoom.getCreatedAt();

        return new ChatRoomResponse(chatRoom.getId(), oppositeMemberResponse, lastMessage, lastMessageCreatedAt,
            unreadMessageCount);
    }

    @Getter
    public static class OppositeMemberResponse {

        private final Role role;
        private final String profileUrl;
        private final String name;

        private OppositeMemberResponse(Member oppositeMember) {
            this.role = oppositeMember.getRole();
            this.profileUrl = oppositeMember.getProfileUrl();
            this.name = oppositeMember.getName();
        }
    }
}
