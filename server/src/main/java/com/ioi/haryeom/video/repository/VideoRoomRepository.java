package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.video.domain.VideoRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRoomRepository extends JpaRepository<VideoRoom, Long> {

    Optional<VideoRoom> findByScheduleId(Long scheduleId);
}
