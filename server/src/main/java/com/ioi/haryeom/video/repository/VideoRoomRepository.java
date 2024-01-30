package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.video.domain.VideoRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRoomRepository extends JpaRepository<VideoRoom, Long> {
    Optional<VideoRoom> findByTutoringScheduleId(Long tutoringScheduleId);

    @Modifying
    @Query(value = "truncate table video_room", nativeQuery = true)
    void truncateVideoRoom();
}
