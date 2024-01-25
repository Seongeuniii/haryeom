package com.ioi.haryeom.matching.service;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.dto.CreateMatchingResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.repository.SubjectRepository;
import com.ioi.haryeom.common.util.IdGenerator;
import com.ioi.haryeom.matching.dto.CreateMatchingRequest;
import com.ioi.haryeom.matching.manager.MatchingManager;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.exception.SubjectNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
public class MatchingService {


    private final SimpMessagingTemplate messagingTemplate;
    private MatchingManager matchingManager;
    private MemberRepository memberRepository;
    private ChatRoomRepository chatRoomRepository;
    private SubjectRepository subjectRepository;

    @Transactional
    public String createMatchingService(CreateMatchingRequest request, Long memberId) {

        ChatRoom chatRoom = chatRoomRepository.findById(request.getChatRoomId())
            .orElseThrow(() -> new ChatRoomNotFoundException(request.getChatRoomId()));

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));

        Subject subject = subjectRepository.findById(request.getSubjectId())
            .orElseThrow(() -> new SubjectNotFoundException(request.getSubjectId()));

        String matchingId = IdGenerator.createMatchingId();
        matchingManager.addMatching(matchingId, request);

        CreateMatchingResponse response = CreateMatchingResponse.of(chatRoom, member, subject,
            request.getHourlyRate());

        // TODO: 알림 구현??
        log.info("[MATCHING REQUEST] chatRoomId : {}, matchingId : {}", chatRoom.getId(), matchingId);
        messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoom.getId() + "/request", response);
        return matchingId;
    }
}
