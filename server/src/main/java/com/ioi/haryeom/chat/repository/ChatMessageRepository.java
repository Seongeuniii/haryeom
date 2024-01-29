package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatMessage;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, ObjectId> {

    ChatMessage findFirstByChatRoomIdOrderByCreatedAtDesc(Long chatRoomId);

    Integer countAllByChatRoomIdAndIdGreaterThan(Long chatRoomId, ObjectId lastReadMessageId);

    Page<ChatMessage> findByChatRoomId(Long chatRoomId, Pageable pageable);

    Page<ChatMessage> findByChatRoomIdAndIdLessThan(Long chatRoomId, ObjectId lastMessageId, Pageable pageable);
}
