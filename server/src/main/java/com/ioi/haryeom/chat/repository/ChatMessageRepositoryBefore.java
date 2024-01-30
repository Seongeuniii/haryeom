package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatMessageBefore;
import com.ioi.haryeom.chat.domain.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepositoryBefore extends JpaRepository<ChatMessageBefore, Long> {

    ChatMessageBefore findFirstByChatRoomOrderByCreatedAtDesc(ChatRoom chatRoom);

    Integer countAllByChatRoomAndIdGreaterThan(ChatRoom chatRoom, Long lastReadMessageId);

    Page<ChatMessageBefore> findByChatRoom(ChatRoom chatRoom, Pageable pageable);

    Page<ChatMessageBefore> findByChatRoomAndIdLessThan(ChatRoom chatRoom, Long lastMessageId, Pageable pageable);
}
