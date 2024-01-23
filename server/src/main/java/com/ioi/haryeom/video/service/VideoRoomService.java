package com.ioi.haryeom.video.service;

import com.ioi.haryeom.video.domain.VideoRoom;
import com.ioi.haryeom.video.repository.VideoRoomRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VideoRoomService {

    private final VideoRoomRepository videoRoomRepository;

    public String getVideoRoomByScheduleId(Long scheduleId) {
        Optional<VideoRoom> videoRooms = videoRoomRepository.findByScheduleId(scheduleId);
        if (videoRooms.isPresent()) {
            VideoRoom videoRoom = videoRooms.get();
            return videoRoom.getRoomCode();
        }
        return "tmpRoomCode";
    }

//    @Transactional
//    @Scheduled(cron = "0 0 0 * * *")
//    public void createRooms() {
//        //Todo: scheduler 활용 방 코드 생성 구현
//    }

}
