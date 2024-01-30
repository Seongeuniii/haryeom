package com.ioi.haryeom.video.service;

import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.ClassRoom;
import com.ioi.haryeom.video.domain.VideoRoom;
import com.ioi.haryeom.video.exception.VideoRoomNotFoundException;
import com.ioi.haryeom.video.repository.VideoRoomRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VideoRoomService {

    private final VideoRoomRepository videoRoomRepository;
    private final TutoringScheduleRepository tutoringScheduleRepository;

    // 일반적인 수업일정 접근
    public String getVideoRoomByScheduleId(Long tutoringScheduleId) {
        Optional<VideoRoom> videoRoom = videoRoomRepository.findByTutoringScheduleId(tutoringScheduleId);
        if (videoRoom.isPresent()) {
            return videoRoom.get().getRoomCode();
        }

        // 새로 생성된 수업에 대한 접근
        // 없으면 이미 지난 수업인지, 해야할 수업인지
        Optional<TutoringSchedule> checkTutoringSchedule = tutoringScheduleRepository.findById(tutoringScheduleId);
        if(checkTutoringSchedule.isPresent()) {
            TutoringSchedule newSchedule = checkTutoringSchedule.get();
            if(!newSchedule.getScheduleDate().isEqual(LocalDate.now())){
                throw new VideoRoomNotFoundException(tutoringScheduleId);
            }
            // 코드 재활용을 위해서 굳이 리스트로 tutoringSchedule 저장
            List<TutoringSchedule> tutoringSchedule = new ArrayList<>();
            tutoringSchedule.add(checkTutoringSchedule.get());
            createRooms(tutoringSchedule);
            // 생성됐으니까 생성된거 조회해서 다시 리턴
            return videoRoomRepository.findByTutoringScheduleId(tutoringScheduleId).get().getRoomCode();
        }
        // 해당 회원의 수업 날이 아닌데 접근하려고 한다 -> 오류처리 필요
        // schedule과 연관된 회원이 아닌데 접근하려 한다 -> auth관련 예외처리
        throw new VideoRoomNotFoundException(tutoringScheduleId);
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *") // 0 0 0 * * * : 매일 12시
    public void dailyCreateRoom() {
        //1. 기존 방코드 목록 폐기
        truncateVideoRooms();

        //2. 당일 과외일정 가져오기
        List<TutoringSchedule> tutoringScheduleList = getTodayTutoringSchedule();

        //3. 당일 과외일정 방코드 생성 및 저장하기
        createRooms(tutoringScheduleList);
    }
    //1. 기존 방코드 목록 폐기
    @Transactional
    public void truncateVideoRooms(){
        videoRoomRepository.truncateVideoRoom();
    }
    //2. 당일 과외일정 가져오기
    private List<TutoringSchedule> getTodayTutoringSchedule(){
        LocalDate today = LocalDate.now();
        List<TutoringSchedule> tutoringScheduleList = tutoringScheduleRepository.findAllByScheduleDate(today);
        return tutoringScheduleList;
    }

    //3. 당일 과외일정 방코드 생성 및 저장하기
    @Transactional
    public void createRooms(List<TutoringSchedule> tutoringScheduleList){
        List<VideoRoom> videoRoomList = new ArrayList<>();
        for(TutoringSchedule tutoringSchedule : tutoringScheduleList){
            String roomCode = UUID.randomUUID().toString();
            VideoRoom videoRoom = VideoRoom.builder()
                .tutoringSchedule(tutoringSchedule)
                .roomCode(roomCode)
                .build();
            videoRoomList.add(videoRoom);
        }
        List<VideoRoom> savedVideoRoomList = videoRoomRepository.saveAll(videoRoomList);
    }
}
