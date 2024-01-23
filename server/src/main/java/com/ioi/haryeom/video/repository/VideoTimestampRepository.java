package com.ioi.haryeom.video.repository;

import com.ioi.haryeom.video.domain.VideoTimestamp;
import com.ioi.haryeom.video.dto.VideoTimestampDto;
import com.ioi.haryeom.video.dto.VideoTimestampInterface;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoTimestampRepository extends JpaRepository<VideoTimestamp, Long> {
    List<VideoTimestampInterface> findByVideo_Id(Long videoId);
}
