package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {


    Optional<ChatRoom> findByIdAndIsDeletedFalse(Long chatRoomId);

    Optional<ChatRoom> findByTeacherMemberAndStudentMemberAndIsDeletedFalse(Member studentMember, Member teacherMember);
}
