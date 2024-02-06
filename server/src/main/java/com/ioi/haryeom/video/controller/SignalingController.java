package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.video.domain.ClassRoom;
import com.ioi.haryeom.video.dto.Answer;
import com.ioi.haryeom.video.dto.IceRequest;
import com.ioi.haryeom.video.dto.IceResponse;
import com.ioi.haryeom.video.dto.Offer;
import com.ioi.haryeom.video.dto.MemberSignalingInfo;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class SignalingController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    ClassRoom classRoom = ClassRoom.getClassRoom();

    // 방 입장
    @MessageMapping("/join/room/{roomCode}")
    public void joinToWelcome(@Payload MemberSignalingInfo memberSignalingInfo, @DestinationVariable (value = "roomCode") String roomCode) {

        log.info("joinRoom : {} roomCode : {}", memberSignalingInfo.getMemberId(), roomCode);
        // 방에 처음 입장하는 사람의 경우, join을 알리지 않고 방 안 유저리스트에만 추가된다
        if(classRoom.isFirstJoin(roomCode)){
            classRoom.addUser(roomCode, memberSignalingInfo);
            String welcomeDestination = "/topic/welcome/room/"+roomCode
                +"/"+memberSignalingInfo.getMemberId();
            log.info("welcomeDestination : {}, classRoomMemberList: {}", welcomeDestination, classRoom.getMemberList(roomCode).toString());
            simpMessagingTemplate.convertAndSend(welcomeDestination, classRoom.getMemberList(roomCode));
            return;
        }
        boolean isEnteredAgain = false;
        //그 이후 들어오는 경우, 방 안에 있는 사람에게 enterRoom을 알린 뒤, 방 안 유저리스트에 추가된다
        List<MemberSignalingInfo> peers= classRoom.getMemberList(roomCode);
        log.info("peer size : {} ", peers.size());
        for(int i=0;i<peers.size();i++){
            // 현재 disconnect 시 list에서 제거할 방법 모르겠어서 일단 임시로 추가...
            if(peers.get(i).getMemberId() == memberSignalingInfo.getMemberId()) {
                isEnteredAgain = true;
                continue;
            }
            log.info("send enterRoom : {}, peers Id : {}", memberSignalingInfo.getMemberId(), peers.get(i).getMemberId());
            String destination = "/topic/enterRoom/room/"+roomCode
                +"/"+peers.get(i).getMemberId();
            log.info("destination : {}", destination);
            simpMessagingTemplate.convertAndSend(destination, memberSignalingInfo);
        }
        if(!isEnteredAgain) classRoom.addUser(roomCode, memberSignalingInfo);
        String welcomeDestination = "/topic/welcome/room/"+roomCode
            +"/"+memberSignalingInfo.getMemberId();
        log.info("welcomeDestination : {}, classRoomMemberList: {}", welcomeDestination, classRoom.getMemberList(roomCode).toString());
        simpMessagingTemplate.convertAndSend(welcomeDestination, classRoom.getMemberList(roomCode));
        return;
    }

    //join을 들은 방 안에 있던 사람 각각이 새로 들어온 사람에게 welcome을 전달 - 안 쓸듯
    @MessageMapping("/welcome/room/{roomCode}/{memberId}")
    public void enterRoom(@Payload MemberSignalingInfo memberSignalingInfo, @DestinationVariable(value = "roomCode") String roomCode, @DestinationVariable(value = "memberId") String memberId){
        log.info("enterRoom");
        String destination = "/topic/welcome/room/"
            +roomCode+"/"+memberId;
        log.info("destination : {}", destination);
        simpMessagingTemplate.convertAndSend(destination, memberSignalingInfo);
        return;
    }

    //welcome을 받은 사람이 caller가 되어 방 안에 있는 사람 각각에게 offer를 전달
    @MessageMapping("/offer/room/{roomCode}/{memberId}")
    public void peerOffer(@Payload Offer offer, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "memberId") String memberId){
        log.info("offer");
        String destination = "/topic/offer/room/"+roomCode+"/"
            +offer.getCalleeId();
        log.info("destination : {}", destination);
        simpMessagingTemplate.convertAndSend(destination, offer);
        return;
    }

    // 방 안에 있던 사람들이 callee가 되어 들어온 사람에게 answer를 전달
    @MessageMapping("/answer/room/{roomCode}/{memberId}")
    public void peerAnswer(@Payload Answer answer, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "memberId") String memberId){
        log.info("answer");
        String destination = "/topic/answer/room/"+roomCode+"/"+answer.getCallerId();
        //+"/"+memberId;
        log.info("destination : {}", destination);
        simpMessagingTemplate.convertAndSend(destination, answer);
        return;
    }

    // ICE candidate 교환
    @MessageMapping("/ice/room/{roomCode}/{peerId}")
    public void peerICE(@Payload IceRequest ice, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "peerId") Long peerId){
        log.info("ice : subscriberId: {}, senderId: {}", peerId, ice.getMemberId());
        IceResponse iceResponse = new IceResponse(ice.getIceCandidate(), ice.getMemberId());
        log.info("iceResponse : subscriberId: {}, senderId: {}", peerId, iceResponse.getPeerId());
        String destination = "/topic/ice/room/"+roomCode+"/"+peerId;
        log.info("destination : {}, sender: {}", destination, ice.getMemberId());
        simpMessagingTemplate.convertAndSend(destination, iceResponse);
        return;
    }

    @MessageMapping("/disconnect/room/{roomCode}")
    @SendTo("/queue/disconnect/room/{roomCode}")
    public String disconnect(@Payload String disconnect, @DestinationVariable (value="roomCode") String roomCode){
        log.info("disconnect");
        return disconnect;
    }
}
