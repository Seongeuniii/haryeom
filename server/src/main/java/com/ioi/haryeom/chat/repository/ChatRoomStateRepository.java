package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatRoomState;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomStateRepository extends JpaRepository<ChatRoomState, Long> {

    List<ChatRoomState> findAllByMemberId(Long memberId);

}
