package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {


}
