package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.chat.domain.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.domain.ChatRoomState;
import com.ioi.haryeom.chat.dto.ChatRoomResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.exception.ChatRoomStateNotFoundException;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.chat.repository.ChatRoomStateRepository;
import com.ioi.haryeom.common.domain.Subject;
import com.ioi.haryeom.common.dto.SubjectResponse;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.domain.TeacherSubject;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.exception.TeacherNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.member.repository.TeacherRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import com.ioi.haryeom.tutoring.dto.TutoringResponse;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ChatRoomService {

    private final TeacherRepository teacherRepository;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomStateRepository chatRoomStateRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final TutoringRepository tutoringRepository;

    // 채팅방 생성
    // 선생님이 선생님 찾기를 통해서 연락할 수 있다.
    @Transactional
    public Long createChatRoom(Long teacherId, Long memberId) {

        Teacher teacher = findTeacherById(teacherId);
        Member teacherMember = teacher.getMember();

        Member studentMember = findMemberById(memberId);

        ChatRoom chatRoom = ChatRoom.builder()
            .teacherMember(teacher.getMember())
            .studentMember(studentMember)
            .build();

        ChatRoomState studentChatRoomState = ChatRoomState.builder()
            .chatRoom(chatRoom)
            .member(studentMember)
            .build();

        ChatRoomState teacherChatRoomState = ChatRoomState.builder()
            .chatRoom(chatRoom)
            .member(teacherMember)
            .build();

        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
        chatRoomStateRepository.save(studentChatRoomState);
        chatRoomStateRepository.save(teacherChatRoomState);

        return savedChatRoom.getId();
    }


    // 채팅방 목록 조회
    public List<ChatRoomResponse> getChatRoomList(Long memberId) {

        Member member = findMemberById(memberId);
        List<ChatRoomState> chatRoomStates = chatRoomStateRepository.findAllByMemberAndIsDeletedIsFalse(member);

        log.info("[GET CHATROOM LIST] chatRoomStates size : {} ", chatRoomStates.size());

        return chatRoomStates.stream()
            .map(chatRoomState -> createChatRoomResponse(chatRoomState, member))
            .collect(Collectors.toList());
    }

    @Transactional
    public void exitChatRoom(Long memberId, Long chatRoomId) {
        ChatRoom chatRoom = findChatRoomById(chatRoomId);
        Member member = findMemberById(memberId);

        validateMemberInChatRoom(chatRoom, member);

        ChatRoomState chatRoomState = chatRoomStateRepository.findByChatRoomAndMemberAndIsDeletedIsFalse(chatRoom,
            member).orElseThrow(ChatRoomStateNotFoundException::new);

        chatRoomState.delete();
    }


    // 채팅방 구성원 과외 조회
    public List<TutoringResponse> getChatRoomMembersTutoringList(Long chatRoomId, Long memberId) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));

        Member member = findMemberById(memberId);

        validateMemberInChatRoom(chatRoom, member);

        List<Tutoring> tutoringList = tutoringRepository.findAllByChatRoomAndStatus(chatRoom,
            TutoringStatus.IN_PROGRESS);

        return tutoringList.stream()
            .map(tutoring -> new TutoringResponse(tutoring.getId(), tutoring.getSubject()))
            .collect(Collectors.toList());
    }

    // 신청 가능한 과목 조회
    public List<SubjectResponse> getAvailableSubjectsForEnrollment(Long chatRoomId, Long memberId) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));

        Member member = findMemberById(memberId);

        validateMemberInChatRoom(chatRoom, member);

        Member teacherMember = chatRoom.getTeacherMember();
        Teacher teacher = teacherRepository.findByMember(teacherMember)
            .orElseThrow(() -> new TeacherNotFoundException("선생님을 찾을 수 없습니다."));

        // 선생님 과목 조회
        Set<Subject> teacherSubjects = teacher.getTeacherSubjects().stream()
            .map(TeacherSubject::getSubject)
            .collect(Collectors.toSet());

        // 채팅방 구성원 신청한 과목 조회하여 제거
        tutoringRepository.findAllByChatRoomAndStatus(chatRoom, TutoringStatus.IN_PROGRESS)
            .stream()
            .map(Tutoring::getSubject)
            .forEach(teacherSubjects::remove);

        return teacherSubjects.stream()
            .map(SubjectResponse::new)
            .collect(Collectors.toList());
    }

//    private Map<Long, ChatMessage> getLastMessageMap(List<ChatRoomState> chatRoomStates) {
//        return chatRoomStates.stream()
//            .map(ChatRoomState::getChatRoom)
//            .distinct()
//            .collect(Collectors.toMap(
//                ChatRoom::getId,
//                room -> chatMessageRepository.findFirstByChatRoomOrderByCreatedAtDesc(room.getId())
//            ));
//    }

//    private List<ChatRoomResponse> createChatRoomResponses(List<ChatRoomState> chatRoomStates,
//        Map<Long, ChatMessage> lastMessageMap, Long currentMemberId) {
//        return chatRoomStates.stream()
//            .map(state -> createChatRoomResponse(state, lastMessageMap, currentMemberId))
//            .sorted(Comparator.comparing(
//                ChatRoomResponse::getLastMessageCreatedAt,
//                Comparator.reverseOrder()))
//            .collect(Collectors.toList());
//    }

    private ChatRoomResponse createChatRoomResponse(ChatRoomState chatRoomState, Member member) {
        Long lastReadMessageId = chatRoomState.getLastReadMessageId();
        ChatRoom chatRoom = chatRoomState.getChatRoom();

        ChatMessage lastChatMessage = chatMessageRepository.findFirstByChatRoomOrderByCreatedAtDesc(chatRoom);
        Integer unreadMessageCount = chatMessageRepository.countAllByChatRoomAndIdGreaterThan(chatRoom,
            lastReadMessageId);
        Member oppositeMember = chatRoom.getOppositeMember(member);

        return ChatRoomResponse.of(chatRoomState, lastChatMessage, oppositeMember, unreadMessageCount);
    }


    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException(memberId));
    }

    private ChatRoom findChatRoomById(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));
    }

    private Teacher findTeacherById(Long teacherId) {
        return teacherRepository.findById(teacherId)
            .orElseThrow(() -> new TeacherNotFoundException(teacherId));
    }

    private void validateMemberInChatRoom(ChatRoom chatRoom, Member member) {
        if (!chatRoom.isMemberPartOfChatRoom(member)) {
            throw new AuthorizationException(member.getId());
        }
    }

}
