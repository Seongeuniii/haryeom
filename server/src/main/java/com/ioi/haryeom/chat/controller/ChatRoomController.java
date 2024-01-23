package com.ioi.haryeom.chat.controller;

import com.ioi.haryeom.chat.dto.ChatRoomRequest;
import com.ioi.haryeom.chat.dto.ChatRoomResponse;
import com.ioi.haryeom.chat.service.ChatRoomService;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/chatrooms")
@RequiredArgsConstructor
@RestController
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    // TODO: memberId 변경 해야함
    private Long memberId = 2L;

    // 채팅방 생성
    @PostMapping("")
    public ResponseEntity<Void> createChatRoom(@RequestBody ChatRoomRequest request) {

        Long chatRoomId = chatRoomService.createChatRoom(request.getTeacherId(), memberId);
        return ResponseEntity.created(URI.create("/chatrooms/" + chatRoomId)).build();
    }

    // 채팅방 리스트 조회
    @GetMapping("")
    public ResponseEntity<List<ChatRoomResponse>> getChatRoomList() {
        List<ChatRoomResponse> response = chatRoomService.getChatRoomList(memberId);
        return ResponseEntity.ok(response);
    }
}
