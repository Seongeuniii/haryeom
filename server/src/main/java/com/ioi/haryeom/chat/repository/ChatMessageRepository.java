package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    ChatMessage findFirstByChatRoomOrderByCreatedAtDesc(ChatRoom chatRoom);

    Integer countAllByChatRoomAndIdGreaterThan(ChatRoom chatRoom, Long lastReadMessageId);
}
