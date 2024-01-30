package com.ioi.haryeom.video.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.tutoring.domain.TutoringSchedule;
import com.ioi.haryeom.tutoring.exception.TutoringScheduleNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringScheduleRepository;
import com.ioi.haryeom.video.domain.VideoRoom;
import com.ioi.haryeom.video.exception.VideoRoomNotFoundException;
import com.ioi.haryeom.video.repository.VideoRoomRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VideoRoomService {

    private final VideoRoomRepository videoRoomRepository;
    private final TutoringScheduleRepository tutoringScheduleRepository;

    public String getVideoRoomByScheduleId(Long tutoringScheduleId, Long memberId) {
        // 초기 예외처리
        Optional<TutoringSchedule> tutoringScheduleOptional = tutoringScheduleRepository.findById(tutoringScheduleId);
        // 과외일정 없는 경우 접근 불가
        isScheduleValid(tutoringScheduleOptional, tutoringScheduleId);
        // 해당 학생 or 선생님 제외 접근 불가
        isMemberValid(tutoringScheduleOptional, memberId);

        Optional<VideoRoom> videoRoom = videoRoomRepository.findByTutoringScheduleId(tutoringScheduleId);
        // 일반적인 수업일정 접근
        if (videoRoom.isPresent()) {
            return videoRoom.get().getRoomCode();
        }
        // 새로 생성된 수업에 대한 접근
        // 없으면 이미 지난 수업인지, 해야할 수업인지

        TutoringSchedule newSchedule = tutoringScheduleOptional.get();
        // 오늘 수업이 아닌 경우 예외처리
        if(!newSchedule.getScheduleDate().isEqual(LocalDate.now())){
            throw new VideoRoomNotFoundException(tutoringScheduleId);
        }
        // 코드 재활용을 위해서 굳이 리스트로 tutoringSchedule 저장
        List<TutoringSchedule> tutoringSchedule = new ArrayList<>();
        tutoringSchedule.add(newSchedule);
        createRooms(tutoringSchedule);
        // 생성됐으니까 생성된거 조회해서 다시 리턴
        return videoRoomRepository.findByTutoringScheduleId(tutoringScheduleId).get().getRoomCode();
    }
    private void isScheduleValid(Optional<TutoringSchedule> tutoringScheduleOptional, Long tutoringScheduleId){
        if(!tutoringScheduleOptional.isPresent()){
            throw new TutoringScheduleNotFoundException(tutoringScheduleId);
        }
    }
    private void isMemberValid(Optional<TutoringSchedule> tutoringScheduleOptional, Long memberId){
        TutoringSchedule tutoringSchedule =tutoringScheduleOptional.get();
        Long studentId = tutoringSchedule.getTutoring().getStudent().getId();
        Long teacherId = tutoringSchedule.getTutoring().getTeacher().getId();
        if(memberId!=studentId && memberId != teacherId){
            throw new AuthorizationException(memberId);
        }
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
