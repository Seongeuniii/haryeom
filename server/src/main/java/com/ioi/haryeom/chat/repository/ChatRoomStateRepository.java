package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.domain.ChatRoomState;
import com.ioi.haryeom.member.domain.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomStateRepository extends JpaRepository<ChatRoomState, Long> {

    List<ChatRoomState> findAllByMemberAndIsDeletedIsFalse(Member member);

    Optional<ChatRoomState> findByChatRoomAndMemberAndIsDeletedIsFalse(ChatRoom chatRoom, Member member);
}
