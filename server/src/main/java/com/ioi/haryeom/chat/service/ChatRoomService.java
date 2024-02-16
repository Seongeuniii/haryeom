package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.auth.exception.AuthorizationException;
import com.ioi.haryeom.chat.document.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.domain.ChatRoomState;
import com.ioi.haryeom.chat.dto.ChatMessageResponse;
import com.ioi.haryeom.chat.dto.ChatRoomResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.exception.ChatRoomStateNotFoundException;
import com.ioi.haryeom.chat.exception.SelfChatroomException;
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
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final TutoringRepository tutoringRepository;
    private final ChatMessageRepository chatMessageRepository;

    // 채팅방 생성 또는 조회
    // 선생님 상세 조회를 통해 채팅방을 생성 또는 조회한다.
    // 선생님이 선생님에게 상담 신청해서 채팅방이 생성되면, 신청한 선생님은 학생이 된다.
    @Transactional
    public Long createOrGetChatRoom(Long teacherId, Long memberId) {

        Teacher teacher = findTeacherById(teacherId);
        Member teacherMember = teacher.getMember();
        Member studentMember = findMemberById(memberId);
        validateSelfChatRoom(teacherMember, studentMember);

        log.info("[CREAT OR GET CHATROOM] teacherId : {}, teacherMemberId : {}, studentMemberId : {}", teacher.getId(), teacherMember.getId(),
            studentMember.getId());

        // 채팅방 생성될 수 있는 CASE
        // 1. 학생과 선생님
        // 2. 선생님과 다른 선생님 (선생님1 -> 선생님2, 선생님 2 -> 선생님1) 동일 해야함
        // 채팅방이 이미 존재하면, 존재하는 채팅방을 반환한다.
        return chatRoomRepository.findChatRoomByMemberIdsAndIsDeletedFalse(studentMember.getId(), teacherMember.getId())
            .map(chatRoom -> recoverChatRoomStateIfDeleted(chatRoom, studentMember))
            .orElseGet(() -> createNewChatRoom(teacherMember, studentMember));
    }

    private Long recoverChatRoomStateIfDeleted(ChatRoom chatRoom, Member studentMember) {
        // 만약 생성하는 학생이 채팅방을 나갔으면, 채팅방 목록에 보이도록 복구한다.
        chatRoomStateRepository.findByChatRoomAndMember(chatRoom, studentMember)
            .filter(ChatRoomState::getIsDeleted)
            .ifPresent(ChatRoomState::recover);
        return chatRoom.getId();
    }

    private Long createNewChatRoom(Member teacherMember, Member studentMember) {

        ChatRoom chatRoom = ChatRoom.builder()
            .teacherMember(teacherMember)
            .studentMember(studentMember)
            .build();

        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

        // 채팅방을 만든 주체(학생)에 대한 채팅방 상태를 저장한다.
        chatRoomStateRepository.saveAll(Arrays.asList(
            ChatRoomState.builder().chatRoom(chatRoom).member(studentMember).build(),
            ChatRoomState.builder().chatRoom(chatRoom).member(teacherMember).build()));

        log.info("[CREAT CHATROOM] chatRoomId : {}, teacherMemberId : {}, studentMemberId : {}", savedChatRoom.getId(), teacherMember.getId(),
            studentMember.getId());
        return savedChatRoom.getId();
    }


    // 채팅방 목록 조회
    public List<ChatRoomResponse> getChatRoomList(Long memberId) {

        Member member = findMemberById(memberId);
        List<ChatRoomState> chatRoomStates = chatRoomStateRepository.findAllByMemberAndIsDeletedIsFalse(member);

        return chatRoomStates.stream()
            .map(chatRoomState -> createChatRoomResponse(chatRoomState, member))
            .sorted(Comparator.comparing(ChatRoomResponse::getLastMessageCreatedAt, Comparator.nullsFirst(Comparator.reverseOrder())))
            .collect(Collectors.toList());
    }

    // 채팅방 나가기
    @Transactional
    public void exitChatRoom(Long memberId, Long chatRoomId) {
        ChatRoom chatRoom = findChatRoomById(chatRoomId);
        Member member = findMemberById(memberId);

        validateMemberInChatRoom(chatRoom, member);

        ChatRoomState chatRoomState = chatRoomStateRepository.findByChatRoomAndMemberAndIsDeletedIsFalse(chatRoom,
            member).orElseThrow(ChatRoomStateNotFoundException::new);

        chatRoomState.delete();
    }

    // 채팅방 메시지 목록 조회
    @Transactional
    public List<ChatMessageResponse> getChatMessageList(Long chatRoomId, String lastMessageId, Integer size, Long memberId) {

        ChatRoom chatRoom = findChatRoomById(chatRoomId);
        Member member = findMemberById(memberId);

        validateMemberInChatRoom(chatRoom, member);

        Pageable pageable = createPageable(size);
        Page<ChatMessage> chatMessagePage = (lastMessageId == null) ?
            chatMessageRepository.findByChatRoomId(chatRoomId, pageable) :
            chatMessageRepository.findByChatRoomIdAndIdLessThan(chatRoomId, new ObjectId(lastMessageId), pageable);

        log.info("lastMessageID>>>");
        // 첫 메시지 조회인 경우 lastReadMessageId 업데이트
        if (lastMessageId == null && !chatMessagePage.isEmpty()) {
            log.info("lastMessageID UPDATE!!!!!!!");
            updateLastReadMessageId(chatRoom, member, chatMessagePage);
        }

        return chatMessagePage.getContent()
            .stream()
            .map(ChatMessageResponse::from)
            .collect(Collectors.toList());
    }

    // 채팅방 구성원 과외 조회
    public List<TutoringResponse> getChatRoomMembersTutoringList(Long chatRoomId, Long memberId) {

        ChatRoom chatRoom = findChatRoomById(chatRoomId);

        Member member = findMemberById(memberId);

        validateMemberInChatRoom(chatRoom, member);

        List<Tutoring> tutoringList = tutoringRepository.findAllByChatRoomAndStatus(chatRoom, TutoringStatus.IN_PROGRESS);

        return tutoringList.stream()
            .map(tutoring -> new TutoringResponse(tutoring.getId(), tutoring.getSubject()))
            .collect(Collectors.toList());
    }

    // 신청 가능한 과목 조회
    public List<SubjectResponse> getAvailableSubjectsForEnrollment(Long chatRoomId, Long memberId) {

        ChatRoom chatRoom = findChatRoomById(chatRoomId);

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

    private ChatRoomResponse createChatRoomResponse(ChatRoomState chatRoomState, Member member) {
        String lastReadMessageId = chatRoomState.getLastReadMessageId();
        ChatRoom chatRoom = chatRoomState.getChatRoom();

        ChatMessage lastChatMessage = chatMessageRepository.findFirstByChatRoomIdOrderByCreatedAtDesc(chatRoom.getId());
        Integer unreadMessageCount = chatMessageRepository.countAllByChatRoomIdAndIdGreaterThan(chatRoom.getId(), new ObjectId(lastReadMessageId));
        Member oppositeMember = chatRoom.getOppositeMember(member);

        return ChatRoomResponse.of(chatRoom, lastChatMessage, oppositeMember, unreadMessageCount);
    }

    private void updateLastReadMessageId(ChatRoom chatRoom, Member member, Page<ChatMessage> chatMessagePage) {
        String lastReadMessageId = chatMessagePage.getContent().get(0).getId().toHexString();
        ChatRoomState chatRoomState = chatRoomStateRepository.findByChatRoomAndMemberAndIsDeletedIsFalse(chatRoom, member)
            .orElseThrow(ChatRoomStateNotFoundException::new);
        chatRoomState.updateLastReadMessageId(lastReadMessageId);
    }

    private Pageable createPageable(Integer size) {
        return PageRequest.of(0, size, Sort.by("id").descending());
    }

    private void validateSelfChatRoom(Member teacherMember, Member studentMember) {
        if (teacherMember.equals(studentMember)) {
            throw new SelfChatroomException();
        }
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException(memberId));
    }

    private ChatRoom findChatRoomById(Long chatRoomId) {
        return chatRoomRepository.findByIdAndIsDeletedFalse(chatRoomId)
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
