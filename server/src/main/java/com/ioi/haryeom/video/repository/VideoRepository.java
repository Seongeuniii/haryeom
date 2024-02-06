package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.video.domain.Video;
import java.util.Optional;
import javax.swing.text.html.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    Optional<Video> findByTutoringSchedule_Id(Long tutoringScheduleId);

}
