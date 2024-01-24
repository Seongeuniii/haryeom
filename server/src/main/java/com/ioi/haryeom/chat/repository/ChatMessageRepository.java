package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    ChatMessage findFirstByChatRoomOrderByCreatedAtDesc(ChatRoom chatRoom);

    Integer countAllByChatRoomAndIdGreaterThan(ChatRoom chatRoom, Long lastReadMessageId);

    Page<ChatMessage> findByChatRoom(ChatRoom chatRoom, Pageable pageable);

    Page<ChatMessage> findByChatRoomAndIdLessThan(ChatRoom chatRoom, Long lastMessageId, Pageable pageable);
}
