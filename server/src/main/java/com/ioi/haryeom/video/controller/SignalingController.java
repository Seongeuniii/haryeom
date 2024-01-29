package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.video.domain.ClassRoom;
import com.ioi.haryeom.video.dto.Answer;
import com.ioi.haryeom.video.dto.Ice;
import com.ioi.haryeom.video.dto.Offer;
import com.ioi.haryeom.video.dto.MemberSignalingInfo;
import java.util.List;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignalingController {

    SimpMessagingTemplate simpMessagingTemplate;
    ClassRoom classRoom = ClassRoom.getClassRoom();

    // 방 입장
    @MessageMapping("/join/room/{roomCode}")
    public void joinToWelcome(@Payload MemberSignalingInfo memberSignalingInfo, @DestinationVariable (value = "roomCode") String roomCode) {

        // 방에 처음 입장하는 사람의 경우, join을 알리지 않고 방 안 유저리스트에만 추가된다
        if(classRoom.isFirstJoin(roomCode)){
            classRoom.addUser(roomCode, memberSignalingInfo);
            return;
        }

        //그 이후 들어오는 경우, 방 안에 있는 사람에게 enterRoom을 알린 뒤, 방 안 유저리스트에 추가된다
        List<MemberSignalingInfo> peers= classRoom.getMemberList(roomCode);
        for(int i=0;i<peers.size();i++){
            // 현재 disconnect 시 list에서 제거할 방법 모르겠어서 일단 임시로 추가...
            if(peers.get(i).getMemberId() == memberSignalingInfo.getMemberId()) continue;

            String destination = "/queue/enterRoom/room/"+roomCode
                +"/"+peers.get(i).getMemberId();
            simpMessagingTemplate.convertAndSend(destination, memberSignalingInfo);
        }
        classRoom.addUser(roomCode, memberSignalingInfo);
        return;
    }

    //join을 들은 방 안에 있던 사람 각각이 새로 들어온 사람에게 welcome을 전달
    @MessageMapping("/welcome/room/{roomCode}/{userId}")
    public void enterRoom(@Payload MemberSignalingInfo memberSignalingInfo, @DestinationVariable(value = "roomCode") String roomCode, @DestinationVariable(value = "userId") String userId){
        String destination = "/queue/welcome/room/"
            +roomCode+"/"+userId;
        simpMessagingTemplate.convertAndSend(destination, memberSignalingInfo);
        return;
    }

    //welcome을 받은 사람이 caller가 되어 방 안에 있는 사람 각각에게 offer를 전달
    @MessageMapping("/offer/room/{roomCode}/{userId}")
    public void peerOffer(@Payload Offer offer, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "userId") String userId){
        String destination = "/queue/offer/room/"+roomCode+"/"
            +offer.getCalleeId();
        simpMessagingTemplate.convertAndSend(destination, offer);
        return;
    }

    // 방 안에 있던 사람들이 callee가 되어 들어온 사람에게 answer를 전달
    @MessageMapping("/answer/room/{roomCode}/{userId}")
    public void peerAnswer(@Payload Answer answer, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "userId") String userId){
        String destination = "/queue/answer/room/"+roomCode+"/"+answer.getCallerId();
            //+"/"+userId;
        simpMessagingTemplate.convertAndSend(destination, answer);
        return;
    }

    // ICE candidate 교환
    @MessageMapping("/ice/room/{roomCode}/{userId}")
    public void peerICE(@Payload Ice ice, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "userId") String userId){
        String destination = "/queue/ice/room/"+roomCode+"/"+userId;
        simpMessagingTemplate.convertAndSend(destination, ice);
        return;
    }

    @MessageMapping("/disconnect/room/{roomCode}")
    @SendTo("/queue/disconnect/room/{roomCode}")
    public String disconnect(@Payload String disconnect, @DestinationVariable (value="roomCode") String roomCode){
        return disconnect;
    }
}
