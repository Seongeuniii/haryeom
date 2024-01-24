package com.ioi.haryeom.tutoring.repository;


import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutoringRepository extends JpaRepository<Tutoring, Long> {


    List<Tutoring> findAllByTeacherId(Long teacherMemberId);

    List<Tutoring> findAllByChatRoomAndStatus(ChatRoom chatRoom, TutoringStatus status);


}
