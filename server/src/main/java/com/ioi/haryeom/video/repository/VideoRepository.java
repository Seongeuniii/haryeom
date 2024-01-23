package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.video.domain.Video;
import com.ioi.haryeom.video.dto.VideoDetailInterface;
import com.ioi.haryeom.video.dto.VideoInterface;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    Video findByTutoringSchedule_Id(Long tutoringScheduleId);

    @Query(value = "select v.id, v.start_time as startTime, v.end_time as endTime, s.schedule_date as scheduleDate, s.title from video v"
        + " RIGHT JOIN tutoring_schedule s"
        + " ON v.tutoring_schedule_id=s.id"
        + " RIGHT JOIN tutoring t"
        + " ON t.id=s.tutoring_id"
        + " WHERE t.subject_id = :subjectId", nativeQuery = true)
    List<VideoInterface> findAllBySubjectId(@Param("subjectId") Integer subjectId);

    VideoDetailInterface findVideoById(Long videoId);
}
