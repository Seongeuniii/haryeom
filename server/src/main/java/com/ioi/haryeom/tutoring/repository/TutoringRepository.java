package com.ioi.haryeom.tutoring.repository;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TutoringRepository extends JpaRepository<Tutoring, Long> {

    List<Tutoring> findAllByChatRoomAndStatus(ChatRoom chatRoom, TutoringStatus status);

}
