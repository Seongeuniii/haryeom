package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatMessage;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, ObjectId> {

}
