package com.ioi.haryeom.video.domain;

import com.ioi.haryeom.video.dto.MemberSignalingInfo;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ClassRoom {

    private static ClassRoom classRoom = new ClassRoom();

    private ClassRoom() {
    }

    public static ClassRoom getClassRoom() {
        return classRoom;
    }

    private Map<String, List<MemberSignalingInfo>> roomList = new Hashtable<>();
    private Map<String, String> sessionRoomList = new Hashtable<>();

    public boolean isFirstJoin(String roomCode) {
        if (!roomList.containsKey(roomCode)) {
            roomList.put(roomCode, new ArrayList<>());
            return true;
        }
        return false;
    }

    public List<MemberSignalingInfo> getMemberList(String roomCode) {
        return roomList.get(roomCode);
    }

    public void addUser(String roomCode, MemberSignalingInfo memberSignalingInfo) {
        roomList.get(roomCode).add(memberSignalingInfo);
        sessionRoomList.put(memberSignalingInfo.getMemberId(), roomCode);
    }

    public void deleteUser(String memberId){
        if(sessionRoomList.containsKey(memberId)){
            String roomCode = sessionRoomList.get(memberId);
            MemberSignalingInfo memberSignalingInfo = new MemberSignalingInfo();
            memberSignalingInfo.setMemberId(memberId);
            log.info("Before Delete member: {}", roomList.get(roomCode).size());
            for(int i=0;i<roomList.get(roomCode).size(); i++){
                if(roomList.get(roomCode).get(i).getMemberId().equals(memberId)){
                    roomList.get(roomCode).remove(i);
                    break;
                }
            }
            sessionRoomList.remove(memberId);
            log.info("After Delete member: {}", roomList.get(roomCode).size());
        }
    }
}
