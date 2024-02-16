package com.ioi.haryeom.chat.repository;

import com.ioi.haryeom.chat.domain.ChatRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {


    Optional<ChatRoom> findByIdAndIsDeletedFalse(Long chatRoomId);

    @Query("SELECT cr FROM ChatRoom cr " +
        "WHERE ((cr.studentMember.id = :studentMemberId AND cr.teacherMember.id = :teacherMemberId) OR " +
        "      (cr.studentMember.id = :teacherMemberId AND cr.teacherMember.id = :studentMemberId)) " +
        "      AND cr.isDeleted = false")
    Optional<ChatRoom> findChatRoomByMemberIdsAndIsDeletedFalse(@Param("studentMemberId") Long studentMemberId, @Param("teacherMemberId") Long teacherMemberId);
}
