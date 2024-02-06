package com.ioi.haryeom.matching.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.chat.document.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.dto.ChatMessageEvent;
import com.ioi.haryeom.chat.dto.ChatMessageResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.repository.SubjectRepository;
import com.ioi.haryeom.matching.document.Matching;
import com.ioi.haryeom.matching.document.MatchingResult;
import com.ioi.haryeom.matching.dto.CreateMatchingRequest;
import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.dto.MatchingResponse;
import com.ioi.haryeom.matching.dto.MatchingStatus;
import com.ioi.haryeom.matching.dto.RespondToMatchingRequest;
import com.ioi.haryeom.matching.dto.RespondToMatchingResponse;
import com.ioi.haryeom.matching.exception.DuplicateMatchingException;
import com.ioi.haryeom.matching.exception.DuplicateTutoringException;
import com.ioi.haryeom.matching.exception.InvalidSubjectForTeacherException;
import com.ioi.haryeom.matching.exception.MatchingNotFoundException;
import com.ioi.haryeom.matching.repository.MatchingRepository;
import com.ioi.haryeom.matching.repository.MatchingResultRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.exception.SubjectNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.member.repository.TeacherSubjectRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import com.ioi.haryeom.tutoring.exception.TutoringNotFoundException;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Service
public class MatchingService {

    private final MatchingRepository matchingRepository;
    private final MatchingResultRepository matchingResultRepository;
    private static final String CHAT_ROOM_CHANNEL_NAME = "chatroom";
    private static final String MATCHING_CHANNEL_NAME = "matching";
    private final RedisTemplate<String, Object> redisTemplate;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final SubjectRepository subjectRepository;
    private final TutoringRepository tutoringRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final TeacherSubjectRepository teacherSubjectRepository;

    @Transactional
    public String createMatchingRequest(CreateMatchingRequest request, Long memberId) {

        ChatRoom chatRoom = findChatRoomById(request.getChatRoomId());
        Member studentMember = findMemberById(memberId);
        Subject subject = findSubjectById(request.getSubjectId());

        validateMatchingPrerequisites(chatRoom, studentMember, subject);

        // [매칭 요청 정보] 저장
        Matching matching = Matching.builder()
            .chatRoom(chatRoom)
            .member(studentMember)
            .subject(subject)
            .hourlyRate(request.getHourlyRate())
            .build();
        Matching savedMatching = matchingRepository.save(matching);

        log.info("[MATCHING REQUEST] chat RoomId : {}, matchingId : {}", chatRoom.getId(), savedMatching.getId());

        // 매칭 응답 처리
        boolean isLastResponseRejected = processMatchingResponses(chatRoom.getId());

        // [매칭 요청 정보] 전송
        redisTemplate.convertAndSend(MATCHING_CHANNEL_NAME, new MatchingResponse<>(chatRoom.getId(), MatchingStatus.REQUEST, CreateMatchingResponse.from(matching)));
        log.info("[MATCHING REQUEST INFO] SEND");

        // [매칭 응답 정보] 변경이 있는 경우 전송 (마지막 응답이 거절인 경우)
        if (isLastResponseRejected) {
            List<MatchingResult> matchingResults = matchingResultRepository.findAllByChatRoomIdOrderByIdDesc(chatRoom.getId());
            List<RespondToMatchingResponse> responses = matchingResults.stream()
                .map(RespondToMatchingResponse::from)
                .collect(Collectors.toList());
            // [매칭 응답 정보]가 없는 경우 빈 배열 전송
            redisTemplate.convertAndSend(MATCHING_CHANNEL_NAME,
                new MatchingResponse<>(chatRoom.getId(), MatchingStatus.RESPONSE, responses));
        }

        return savedMatching.getId().toHexString();
    }

    @Transactional
    public Long respondToMatchingRequest(RespondToMatchingRequest request, Long memberId) {

        String matchingId = request.getMatchingId();

        // [매칭 요청 정보] 가져오기
        log.info("[MATCHING REQUEST INFO] RETRIEVE matchingId : {}", matchingId);
        Matching matching = matchingRepository.findById(new ObjectId(matchingId)).orElseThrow(() -> new MatchingNotFoundException(matchingId));
        Long chatRoomId = matching.getChatRoomId();

        ChatRoom chatRoom = findChatRoomById(chatRoomId);
        Member member = findMemberById(memberId);
        validateMemberInChatRoom(chatRoom, member);
        Subject subject = findSubjectById(matching.getSubject().getSubjectId());

        // [매칭 응답 정보] 저장
        log.info("[MATCHING RESPONSE INFO] SAVE");
        MatchingResult matchingResult = MatchingResult.builder()
            .member(member)
            .chatRoom(chatRoom)
            .isAccepted(request.getIsAccepted())
            .matching(matching)
            .build();
        MatchingResult savedMatchingResult = matchingResultRepository.save(matchingResult);

        // [매칭 요청 정보] 삭제
        log.info("[MATCHING REQUEST INFO] DELETE");
        matchingRepository.delete(matching);

        // 과외 매칭 수락
        if (request.getIsAccepted()) {
            return handleAcceptedMatching(savedMatchingResult, chatRoom, subject);
        }

        // 과외 매칭 거절
        log.info("[MATCHING RESPONSE] REJECTED! chatRoomId : {}, matchingId : {}", chatRoom.getId(), matching.getId());
        sendResponse(chatRoom);
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

        redisTemplate.convertAndSend(CHAT_ROOM_CHANNEL_NAME, new ChatMessageEvent(savedChatMessage.getChatRoomId(), ChatMessageResponse.from(savedChatMessage)));
        //TODO: 지금까지 과외한 거 정산해줘야함
    }

    private boolean processMatchingResponses(Long chatRoomId) {
        return matchingResultRepository.findFirstByChatRoomIdOrderByIdDesc(chatRoomId)
            .map(lastMatchingResult -> {
                if (lastMatchingResult.getIsAccepted()) {
                    log.info("[MATCHING RESPONSE] Last response for chatRoomId: {} is accepted", chatRoomId);
                    return false;
                } else {
                    // 마지막 응답이 거절이면, 지우기
                    log.info("[MATCHING RESPONSE] Last response for chatRoomId: {} is rejected", chatRoomId);
                    matchingResultRepository.delete(lastMatchingResult);
                    return true;
                }
            })
            .orElseGet(() -> {
                log.info("[MATCHING RESPONSE] No last response found for chatRoomId: {}", chatRoomId);
                return false;
            });
    }

    private Long handleAcceptedMatching(MatchingResult matchingResult, ChatRoom chatRoom, Subject subject) {

        // 과외 생성
        Tutoring tutoring = Tutoring.builder()
            .chatRoom(chatRoom)
            .subject(subject)
            .hourlyRate(matchingResult.getHourlyRate())
            .student(chatRoom.getStudentMember())
            .teacher(chatRoom.getTeacherMember())
            .build();
        Tutoring savedTutoring = tutoringRepository.save(tutoring);

        log.info("[MATCHING RESPONSE] ACCEPTED! chatRoomId : {}, matchingId : {}", chatRoom.getId(), matchingResult.getId());
        sendResponse(chatRoom);

        return savedTutoring.getId();
    }

    private void sendResponse(ChatRoom chatRoom) {
        // [매칭 응답 정보 목록] 전송
        log.info("[MATCHING RESPONSE INFO LIST] SEND");
        List<MatchingResult> matchingResults = matchingResultRepository.findAllByChatRoomIdOrderByIdDesc(chatRoom.getId());
        List<RespondToMatchingResponse> responses = matchingResults.stream()
            .map(RespondToMatchingResponse::from)
            .collect(Collectors.toList());
        redisTemplate.convertAndSend(MATCHING_CHANNEL_NAME, new MatchingResponse<>(chatRoom.getId(), MatchingStatus.RESPONSE, responses));
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

    private void validateMatchingPrerequisites(ChatRoom chatRoom, Member studentMember, Subject subject) {
        validateMemberInChatRoom(chatRoom, studentMember);
        validateNoExistingMatching(chatRoom.getId());
        // 신청한 과목이 선생님이 가르치는 과목인지 확인
//        validateSubjectForTeacher(chatRoom, subject);
        // 해당하는 선생님과 학생, 과목에 대한 과외가 존재하는지 확인
        validateDuplicateTutoring(chatRoom, studentMember, subject);
    }

    private void validateNoExistingMatching(Long chatRoomId) {
        if (matchingRepository.existsByChatRoomId(chatRoomId)) {
            throw new DuplicateMatchingException(chatRoomId);
        }
    }

    private void validateSubjectForTeacher(ChatRoom chatRoom, Subject subject) {
        Teacher teacher = chatRoom.getTeacherMember().getTeacher();
        if (!teacherSubjectRepository.existsByTeacherAndSubject(teacher, subject)) {
            throw new InvalidSubjectForTeacherException(subject.getId());
        }
    }

    private void validateDuplicateTutoring(ChatRoom chatRoom, Member studentMember, Subject subject) {
        if (tutoringRepository.existsBySubjectAndStudentAndTeacherAndStatus(subject, studentMember, chatRoom.getTeacherMember(),
            TutoringStatus.IN_PROGRESS)) {
            throw new DuplicateTutoringException(subject.getId());
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
