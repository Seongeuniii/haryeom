package com.ioi.haryeom.matching.repository;

import com.ioi.haryeom.matching.document.Matching;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchingRepository extends MongoRepository<Matching, ObjectId> {


    boolean existsByChatRoomId(Long chatRoomId);

    Optional<Matching> findByChatRoomId(Long chatRoomId);
}
