package com.ioi.haryeom.matching.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.chat.domain.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.dto.ChatMessageResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.repository.SubjectRepository;
import com.ioi.haryeom.common.util.IdGenerator;
import com.ioi.haryeom.matching.dto.CreateMatchingRequest;
import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.dto.RespondToMatchingRequest;
import com.ioi.haryeom.matching.dto.RespondToMatchingResponse;
import com.ioi.haryeom.matching.manager.MatchingManager;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.exception.SubjectNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
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
    private TutoringRepository tutoringRepository;
    private ChatMessageRepository chatMessageRepository;

    @Transactional
    public String createMatchingRequest(CreateMatchingRequest request, Long memberId) {

        ChatRoom chatRoom = findChatRoomById(request.getChatRoomId());

        Member member = findMemberById(memberId);

        Subject subject = findSubjectById(request.getSubjectId());

        String matchingId = IdGenerator.createMatchingId();

        CreateMatchingResponse response = CreateMatchingResponse.of(matchingId, chatRoom, member, subject,
            request.getHourlyRate());

        matchingManager.addTutoringMatching(matchingId, response);

        // TODO: 알림 구현??
        log.info("[MATCHING REQUEST] chatRoomId : {}, matchingId : {}", chatRoom.getId(), matchingId);
        messagingTemplate.convertAndSend("/topic/chatrooms/" + chatRoom.getId() + "/request", response);
        return matchingId;
    }

    @Transactional
    public Long respondToMatchingRequest(RespondToMatchingRequest request, Long memberId) {

        CreateMatchingResponse createdMatchingResponse = matchingManager.getTutoringMatchingRequestByMatchingId(
            request.getMatchingId());
        matchingManager.removeTutoringMatchingRequestByMatchingId(request.getMatchingId());

        ChatRoom chatRoom = findChatRoomById(createdMatchingResponse.getChatRoomId());

        Member member = findMemberById(memberId);

        Subject subject = findSubjectById(createdMatchingResponse.getSubject().getSubjectId());

        // 과외 매칭 수락
        if (request.getIsAccepted()) {
            return processAcceptedMatching(chatRoom, member, subject, createdMatchingResponse, request);
        }

        // 과외 매칭 거절
        log.info("[MATCHING RESPONSE] REJECTED! chatRoomId : {}, matchingId : {}", chatRoom.getId(),
            request.getMatchingId());
        sendResponse(chatRoom, member, subject, request.getIsAccepted());
        return null;
    }

    @Transactional
    public void endTutoring(Long tutoringId, Long memberId) {

        Tutoring tutoring = findTutoringById(tutoringId);

        ChatRoom chatRoom = tutoring.getChatRoom();

        Member member = findMemberById(memberId);

        validateTeacherOfTutoring(tutoring, member);

        tutoring.end();

        ChatMessage chatMessage = createEndTutoringMessage(tutoring, member);

        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        ChatMessageResponse response = ChatMessageResponse.from(savedChatMessage);
        messagingTemplate.convertAndSend("/topic/chatrooms/" + chatRoom.getId(), response);
        //TODO: 지금까지 과외한 거 정산해줘야함
    }

    private Long processAcceptedMatching(ChatRoom chatRoom, Member member, Subject subject,
        CreateMatchingResponse createdMatchingResponse, RespondToMatchingRequest request) {

        Tutoring tutoring = Tutoring.builder()
            .chatRoom(chatRoom)
            .subject(subject)
            .hourlyRate(createdMatchingResponse.getHourlyRate())
            .student(chatRoom.getStudentMember())
            .teacher(chatRoom.getTeacherMember())
            .build();
        Tutoring savedTutoring = tutoringRepository.save(tutoring);

        log.info("[MATCHING RESPONSE] ACCEPTED! chatRoomId : {}, matchingId : {}", chatRoom.getId(),
            request.getMatchingId());
        sendResponse(chatRoom, member, subject, request.getIsAccepted());

        return savedTutoring.getId();
    }

    private void sendResponse(ChatRoom chatRoom, Member member, Subject subject, Boolean isAccepted) {
        RespondToMatchingResponse response = RespondToMatchingResponse.of(chatRoom, member, subject, isAccepted);
        messagingTemplate.convertAndSend("/topic/chatrooms/" + chatRoom.getId() + "/response", response);
    }

    private ChatMessage createEndTutoringMessage(Tutoring tutoring, Member member) {

        String endMessage = String.format("%s 선생님과 %s 학생의 %s 과외가 종료되었습니다.", tutoring.getTeacher().getName(),
            tutoring.getStudent().getName(), tutoring.getSubject().getName());

        return ChatMessage.builder()
            .chatRoom(tutoring.getChatRoom())
            .senderMember(member)
            .messageContent(endMessage)
            .build();
    }

    private void validateTeacherOfTutoring(Tutoring tutoring, Member member) {
        if (!tutoring.isTeacherOfTutoring(member)) {
            throw new AuthorizationException("선생님만 과외를 종료할 수 있습니다.");
        }
    }

    private Subject findSubjectById(Long subjectId) {
        return subjectRepository.findById(subjectId)
            .orElseThrow(() -> new SubjectNotFoundException(subjectId));
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException(memberId));
    }

    private ChatRoom findChatRoomById(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));
    }

    private Tutoring findTutoringById(Long tutoringId) {
        return tutoringRepository.findById(tutoringId)
            .orElseThrow(() -> new TutoringNotFoundException(tutoringId));
    }
}
