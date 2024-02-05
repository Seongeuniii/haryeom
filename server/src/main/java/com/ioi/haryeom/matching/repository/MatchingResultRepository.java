package com.ioi.haryeom.matching.repository;

import com.ioi.haryeom.matching.document.MatchingResult;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchingResultRepository extends MongoRepository<MatchingResult, ObjectId> {


    List<MatchingResult> findAllByChatRoomIdOrderByIdDesc(Long chatRoomId);

    Optional<MatchingResult> findFirstByChatRoomIdOrderByIdDesc(Long chatRoomId);

}
