package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.video.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    Video findByTutoringSchedule_Id(Long tutoringScheduleId);

}
