package com.ioi.haryeom.video.controller;

import com.ioi.haryeom.video.domain.ClassRoom;
import com.ioi.haryeom.video.dto.Answer;
import com.ioi.haryeom.video.dto.Disconnect;
import com.ioi.haryeom.video.dto.IceRequest;
import com.ioi.haryeom.video.dto.IceResponse;
import com.ioi.haryeom.video.dto.MemberSignalingInfo;
import com.ioi.haryeom.video.dto.Offer;
import java.util.List;
import javax.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@RestController
@Slf4j
@ServerEndpoint("/signal")
public class SignalingController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    ClassRoom classRoom = ClassRoom.getClassRoom();

    // 방 입장
    @MessageMapping("/join/room/{roomCode}")
    public void joinToWelcome(@Header("simpSessionId") String socketId, @Payload MemberSignalingInfo memberSignalingInfo, @DestinationVariable (value = "roomCode") String roomCode) {
        log.info("joinRoom : {} roomCode : {}", socketId, roomCode);
        // 방에 처음 입장하는 사람의 경우, join을 알리지 않고 방 안 유저리스트에만 추가된다
        if(classRoom.isFirstJoin(roomCode)){
            classRoom.addUser(roomCode, memberSignalingInfo);
            String welcomeDestination = "/topic/welcome/room/"+roomCode
                +"/"+socketId;
            log.info("welcomeDestination : {}, classRoomMemberList: {}", welcomeDestination, classRoom.getMemberList(roomCode).toString());
            simpMessagingTemplate.convertAndSend(welcomeDestination, classRoom.getMemberList(roomCode));
            return;
        }
        boolean isEnteredAgain = false;
        //그 이후 들어오는 경우, 방 안에 있는 사람에게 enterRoom을 알린 뒤, 방 안 유저리스트에 추가된다
        List<MemberSignalingInfo> peers= classRoom.getMemberList(roomCode);
        log.info("peer size : {} ", peers.size());
        for(int i=0;i<peers.size();i++){
            if(peers.get(i).getSocketId().equals(socketId)) {
                isEnteredAgain = true;
                continue;
            }
            log.info("send enterRoom : {}, peers Id : {}", socketId, peers.get(i).getSocketId());
            String destination = "/topic/enterRoom/room/"+roomCode
                +"/"+peers.get(i).getSocketId();
            log.info("destination : {}", destination);
            simpMessagingTemplate.convertAndSend(destination, memberSignalingInfo);
        }
        if(!isEnteredAgain) classRoom.addUser(roomCode, memberSignalingInfo);
        String welcomeDestination = "/topic/welcome/room/"+roomCode
            +"/"+socketId;
        log.info("welcomeDestination : {}, classRoomMemberList: {}", welcomeDestination, classRoom.getMemberList(roomCode).toString());
        simpMessagingTemplate.convertAndSend(welcomeDestination, classRoom.getMemberList(roomCode));
        return;
    }

    //welcome을 받은 사람이 caller가 되어 방 안에 있는 사람 각각에게 offer를 전달
    @MessageMapping("/offer/room/{roomCode}/{socketId}")
    public void peerOffer(@Payload Offer offer, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "socketId") String socketId){
        log.info("offer");
        String destination = "/topic/offer/room/"+roomCode+"/"
            +offer.getCalleeId();
        log.info("destination : {}", destination);
        simpMessagingTemplate.convertAndSend(destination, offer);
        return;
    }

    // 방 안에 있던 사람들이 callee가 되어 들어온 사람에게 answer를 전달
    @MessageMapping("/answer/room/{roomCode}/{socketId}")
    public void peerAnswer(@Payload Answer answer, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "socketId") String socketId){
        log.info("answer");
        String destination = "/topic/answer/room/"+roomCode+"/"+answer.getCallerId();
        //+"/"+memberId;
        log.info("destination : {}", destination);
        simpMessagingTemplate.convertAndSend(destination, answer);
        return;
    }

    // ICE candidate 교환
    @MessageMapping("/ice/room/{roomCode}/{peerId}")
    public void peerICE(@Payload IceRequest ice, @DestinationVariable (value="roomCode") String roomCode, @DestinationVariable (value = "peerId") String peerId){
        log.info("ice : subscriberId: {}, senderId: {}", peerId, ice.getSocketId());
        IceResponse iceResponse = new IceResponse(ice.getIceCandidate(), ice.getSocketId());
        log.info("iceResponse : subscriberId: {}, senderId: {}", peerId, iceResponse.getPeerId());
        String destination = "/topic/ice/room/"+roomCode+"/"+peerId;
        log.info("destination : {}, sender: {}", destination, ice.getSocketId());
        simpMessagingTemplate.convertAndSend(destination, iceResponse);
        return;
    }

    @EventListener
    public void deleteUser(SessionDisconnectEvent event){
        String socketId = event.getSessionId();
        String roomCode = classRoom.deleteUser(socketId);
        if(roomCode == null) return;
        List<MemberSignalingInfo> peerList = classRoom.getMemberList(roomCode);
        for(int i=0;i<peerList.size();i++){
            String peerId = peerList.get(i).getSocketId();
            String destination = "/topic/disconnect/room/"+roomCode+"/"+peerId;
            Disconnect disconnect = new Disconnect();
            disconnect.setPeerId(socketId);
            simpMessagingTemplate.convertAndSend(destination, disconnect);
        }
    }
}