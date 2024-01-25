package com.ioi.haryeom.video.domain;

import com.ioi.haryeom.video.dto.UserDto;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

public class ClassRoom {

    private static ClassRoom classRoom = new ClassRoom();

    private ClassRoom() {
    }

    public static ClassRoom getClassRoom() {
        return classRoom;
    }

    private Map<String, List<UserDto>> roomList = new Hashtable<>();

    public boolean isFirstJoin(String roomCode) {
        if (!roomList.containsKey(roomCode)) {
            roomList.put(roomCode, new ArrayList<>());
            return true;
        }
        return false;
    }

    public List<UserDto> getUserList(String roomCode) {
        return roomList.get(roomCode);
    }

    public void addUser(String roomCode, UserDto userDto) {
        roomList.get(roomCode).add(userDto);
    }
}
