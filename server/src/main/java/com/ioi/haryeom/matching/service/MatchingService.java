package com.ioi.haryeom.matching.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.chat.document.ChatMessage;
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
import com.ioi.haryeom.matching.exception.ChatRoomMatchingNotFoundException;
import com.ioi.haryeom.matching.exception.DuplicateMatchingException;
import com.ioi.haryeom.matching.exception.MatchingNotFoundException;
import com.ioi.haryeom.matching.manager.MatchingManager;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.exception.SubjectNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import java.util.List;
import java.util.Optional;
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
    private final MatchingManager matchingManager;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final SubjectRepository subjectRepository;
    private final TutoringRepository tutoringRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Transactional
    public String createMatchingRequest(CreateMatchingRequest request, Long memberId) {

        ChatRoom chatRoom = findChatRoomById(request.getChatRoomId());
        Member member = findMemberById(memberId);
        validateMemberInChatRoom(chatRoom, member);

        validateNoExistingMatching(chatRoom);

        Subject subject = findSubjectById(request.getSubjectId());

        String matchingId = IdGenerator.createMatchingId();
        log.info("[MATCHING REQUEST] chat RoomId : {}, matchingId : {}", chatRoom.getId(), matchingId);

        CreateMatchingResponse response = CreateMatchingResponse.of(matchingId, chatRoom, member, subject, request.getHourlyRate());

        // [매칭 요청 정보] 저장
        matchingManager.addMatchingRequest(matchingId, chatRoom.getId(), response);
        log.info("[MATCHING REQUEST INFO] SAVE");

        // 매칭 응답 처리
        boolean isLastResponseRejected = processMatchingResponses(chatRoom.getId());

        // [매칭 요청 정보] 전송
        messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoom.getId() + "/request", response);
        log.info("[MATCHING REQUEST INFO] SEND");

        // [매칭 응답 정보] 변경이 있는 경우 전송 (마지막 응답이 거절인 경우)
        if (isLastResponseRejected) {
            List<RespondToMatchingResponse> updatedRespondList = matchingManager.getMatchingResponseByChatRoomId(chatRoom.getId());
            // [매칭 응답 정보]가 없는 경우 빈 배열 전송
            messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoom.getId() + "/response", updatedRespondList);
        }

        return matchingId;
    }

    @Transactional
    public Long respondToMatchingRequest(RespondToMatchingRequest request, Long memberId) {

        String matchingId = request.getMatchingId();

        // [매칭 요청 정보] 가져오기
        log.info("[MATCHING REQUEST INFO] RETRIEVE matchingId : {}", matchingId);
        CreateMatchingResponse createdMatchingResponse = Optional.ofNullable(matchingManager.getMatchingRequestByMatchingId(matchingId))
            .orElseThrow(() -> new MatchingNotFoundException(matchingId));

        Long chatRoomId = Optional.ofNullable(matchingManager.getChatRoomId(matchingId))
            .orElseThrow(() -> new ChatRoomMatchingNotFoundException(matchingId));

        ChatRoom chatRoom = findChatRoomById(chatRoomId);
        Member member = findMemberById(memberId);
        validateMemberInChatRoom(chatRoom, member);

        // [매칭 요청 정보] 삭제
        log.info("[MATCHING REQUEST INFO] DELETE");
        matchingManager.removeMatchingRequestByMatchingId(matchingId);

        Subject subject = findSubjectById(createdMatchingResponse.getSubject().getSubjectId());

        // 과외 매칭 수락
        if (request.getIsAccepted()) {
            return processAcceptedMatching(chatRoom, member, subject, createdMatchingResponse, request);
        }

        // 과외 매칭 거절
        log.info("[MATCHING RESPONSE] REJECTED! chatRoomId : {}, matchingId : {}", chatRoom.getId(), request.getMatchingId());
        sendResponse(chatRoom, member, subject, request.getIsAccepted(), createdMatchingResponse.getHourlyRate());

        return null;
    }

    @Transactional
    public void endTutoring(Long tutoringId, Long memberId) {

        Tutoring tutoring = findTutoringById(tutoringId);

        ChatRoom chatRoom = tutoring.getChatRoom();

        Member member = findMemberById(memberId);

        validateMemberInTutoring(tutoring, member);

        tutoring.end();

        ChatMessage chatMessage = createEndTutoringMessage(tutoring, member);

        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);

        ChatMessageResponse response = ChatMessageResponse.from(savedChatMessage);
        messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoom.getId(), response);
        //TODO: 지금까지 과외한 거 정산해줘야함
    }


    private boolean processMatchingResponses(Long chatRoomId) {

        RespondToMatchingResponse lastResponse = matchingManager.getLastMatchingResponse(chatRoomId);
        log.info("[MATCHING REQUEST] success get lastResponse");

        // 마지막 응답이 비어있거나 거절이 아니면 false
        if (lastResponse == null || lastResponse.getIsAccepted()) {
            return false;
        }

        matchingManager.removeLastMatchingResponse(chatRoomId);
        return true;
    }


    private Long processAcceptedMatching(ChatRoom chatRoom, Member member, Subject subject,
        CreateMatchingResponse createdMatchingResponse, RespondToMatchingRequest request) {

        // 과외 생성
        Tutoring tutoring = Tutoring.builder()
            .chatRoom(chatRoom)
            .subject(subject)
            .hourlyRate(createdMatchingResponse.getHourlyRate())
            .student(chatRoom.getStudentMember())
            .teacher(chatRoom.getTeacherMember())
            .build();
        Tutoring savedTutoring = tutoringRepository.save(tutoring);

        log.info("[MATCHING RESPONSE] ACCEPTED! chatRoomId : {}, matchingId : {}", chatRoom.getId(), request.getMatchingId());
        sendResponse(chatRoom, member, subject, request.getIsAccepted(), savedTutoring.getHourlyRate());

        return savedTutoring.getId();
    }

    private void sendResponse(ChatRoom chatRoom, Member member, Subject subject, Boolean isAccepted, Integer hourlyRate) {
        RespondToMatchingResponse matchingResponse = RespondToMatchingResponse.of(chatRoom, member, subject, isAccepted, hourlyRate);
        // [매칭 응답 정보] 저장
        log.info("[MATCHING RESPONSE INFO] SAVE");
        matchingManager.addMatchingResponse(chatRoom.getId(), matchingResponse);
        // [매칭 응답 정보 목록] 가져오기
        log.info("[MATCHING RESPONSE INFO LIST] RETRIEVE");
        List<RespondToMatchingResponse> response = matchingManager.getMatchingResponseByChatRoomId(chatRoom.getId());
        messagingTemplate.convertAndSend("/topic/chatroom/" + chatRoom.getId() + "/response", response);
    }

    private ChatMessage createEndTutoringMessage(Tutoring tutoring, Member member) {

        String endMessage = String.format("%s 선생님과 %s 학생의 %s 과외가 종료되었습니다.",
            tutoring.getTeacher().getName(), tutoring.getStudent().getName(), tutoring.getSubject().getName());

        return ChatMessage.builder()
            .chatRoomId(tutoring.getChatRoom().getId())
            .memberId(member.getId())
            .content(endMessage)
            .build();
    }

    private void validateNoExistingMatching(ChatRoom chatRoom) {
        if (matchingManager.existsMatchingRequestByChatRoomId(chatRoom.getId())) {
            throw new DuplicateMatchingException(chatRoom.getId());
        }
    }

    private void validateMemberInTutoring(Tutoring tutoring, Member member) {
        if (!tutoring.isMemberPartOfTutoring(member)) {
            throw new AuthorizationException(member.getId());
        }
    }

    private void validateMemberInChatRoom(ChatRoom chatRoom, Member member) {
        if (!chatRoom.isMemberPartOfChatRoom(member)) {
            throw new AuthorizationException(member.getId());
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
        return chatRoomRepository.findByIdAndIsDeletedFalse(chatRoomId)
            .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));
    }

    private Tutoring findTutoringById(Long tutoringId) {
        return tutoringRepository.findByIdAndStatus(tutoringId, TutoringStatus.IN_PROGRESS)
            .orElseThrow(() -> new TutoringNotFoundException(tutoringId));
    }
}
