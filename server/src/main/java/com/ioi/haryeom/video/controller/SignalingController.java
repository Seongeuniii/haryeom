package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.video.domain.ClassRoom;
import com.ioi.haryeom.video.dto.AnswerDto;
import com.ioi.haryeom.video.dto.IceDto;
import com.ioi.haryeom.video.dto.OfferDto;
import com.ioi.haryeom.video.dto.UserDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void joinToWelcome(@Payload UserDto userDto, @DestinationVariable (value = "roomCode") String roomCode) {

        // 방에 처음 입장하는 사람의 경우, join을 알리지 않고 방 안 유저리스트에만 추가된다
        if(classRoom.isFirstJoin(roomCode)){
            classRoom.addUser(roomCode, userDto);
            return;
        }

        //그 이후 들어오는 경우, 방 안에 있는 사람에게 enterRoom을 알린 뒤, 방 안 유저리스트에 추가된다
        List<UserDto> peers= classRoom.getUserList(roomCode);
        for(int i=0;i<peers.size();i++){
            // 현재 disconnect 시 list에서 제거할 방법 모르겠어서 일단 임시로 추가...
            if(peers.get(i).getUserId() == userDto.getUserId()) continue;

            String destination = "/queue/enterRoom/room/"+roomCode
                +"/"+peers.get(i).getUserId();
            simpMessagingTemplate.convertAndSend(destination, userDto);
        }
        classRoom.addUser(roomCode, userDto);
        return;
    }

    //join을 들은 방 안에 있던 사람 각각이 새로 들어온 사람에게 welcome을 전달
    @MessageMapping("/welcome/room/{roomCode}/{userId}")
    public void enterRoom(@Payload UserDto userDto, @DestinationVariable(value = "roomCode") String roomCode, @DestinationVariable(value = "userId") String userId){
        String destination = "/queue/welcome/room/"
            +roomCode+"/"+userId;
        simpMessagingTemplate.convertAndSend(destination, userDto);
        return;
    }

    //welcome을 받은 사람이 caller가 되어 방 안에 있는 사람 각각에게 offer를 전달
    @MessageMapping("/offer/room/{roomCode}/{userId}")
    public void PeerOffer(@Payload OfferDto offerDto, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "userId") String userId){
        String destination = "/queue/offer/room/"+roomCode+"/"
            +offerDto.getCalleeId();
        simpMessagingTemplate.convertAndSend(destination, offerDto);
        return;
    }

    // 방 안에 있던 사람들이 callee가 되어 들어온 사람에게 answer를 전달
    @MessageMapping("/answer/room/{roomCode}/{userId}")
    public void PeerAnswer(@Payload AnswerDto answerDto, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "userId") String userId){
        String destination = "/queue/answer/room/"+roomCode+"/"+answerDto.getCallerId();
            //+"/"+userId;
        simpMessagingTemplate.convertAndSend(destination, answerDto);
        return;
//        return;
    }

    // ICE candidate 교환
    @MessageMapping("/ice/room/{roomCode}/{userId}")
    public void PeerICE(@Payload IceDto iceDto, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "userId") String userId){
        System.out.println(iceDto.getPeerId());
        String destination = "/queue/ice/room/"+roomCode+"/"+userId;
        System.out.println("send ice : "+ destination);
        simpMessagingTemplate.convertAndSend(destination, iceDto);
        return;
    }

    @MessageMapping("/disconnect/room/{roomCode}")
    @SendTo("/queue/disconnect/room/{roomCode}")
    public String Disconnect(@Payload String disconnect, @DestinationVariable (value="roomCode") String roomCode){
        return disconnect;
    }
}
