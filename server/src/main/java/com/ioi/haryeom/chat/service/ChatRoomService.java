package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.chat.domain.ChatMessage;
import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.domain.ChatRoomState;
import com.ioi.haryeom.chat.dto.ChatRoomResponse;
import com.ioi.haryeom.chat.exception.ChatRoomNotFoundException;
import com.ioi.haryeom.chat.repository.ChatMessageRepository;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.chat.repository.ChatRoomStateRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.exception.TeacherNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.member.repository.TeacherRepository;
import com.ioi.haryeom.tutoring.domain.Tutoring;
import com.ioi.haryeom.tutoring.domain.TutoringStatus;
import com.ioi.haryeom.tutoring.dto.TutoringResponse;
import com.ioi.haryeom.tutoring.repository.TutoringRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
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

        Teacher teacher = teacherRepository.findById(teacherId)
            .orElseThrow(() -> new TeacherNotFoundException(teacherId));

        Member studentMember = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException(memberId));

        ChatRoom chatRoom = ChatRoom.builder()
            .teacherMember(teacher.getMember())
            .studentMember(studentMember)
            .build();

        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
        return savedChatRoom.getId();
    }

    // 채팅방 목록 조회
    public List<ChatRoomResponse> getChatRoomList(Long memberId) {
        // 회원의 채팅방 상태 리스트 조회
        List<ChatRoomState> chatRoomStates = chatRoomStateRepository.findAllByMemberId(memberId);

        log.info("[GET CHATROOM LIST] chatRoomStates size : {} ", chatRoomStates.size());

        // 각 채팅방의 마지막 메시지 조회
        Map<Long, ChatMessage> lastMessageMap = getLastMessageMap(chatRoomStates);

        return createChatRoomResponses(chatRoomStates, lastMessageMap, memberId);
    }

    // 채팅방 구성원 과외 조회
    public List<TutoringResponse> getChatRoomMembersTutoringList(Long chatRoomId) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId));
        List<Tutoring> tutoringList = tutoringRepository.findAllByChatRoomAndStatus(chatRoom, TutoringStatus.IN_PROGRESS);

        return tutoringList.stream()
            .map(tutoring -> new TutoringResponse(tutoring.getId(), tutoring.getSubject()))
            .collect(Collectors.toList());
    }


    private Map<Long, ChatMessage> getLastMessageMap(List<ChatRoomState> chatRoomStates) {
        return chatRoomStates.stream()
            .map(ChatRoomState::getChatRoom)
            .distinct()
            .collect(Collectors.toMap(
                ChatRoom::getId,
                room -> chatMessageRepository.findFirstByChatRoomIdOrderByCreatedAtDesc(room.getId())
            ));
    }

    private List<ChatRoomResponse> createChatRoomResponses(List<ChatRoomState> chatRoomStates, Map<Long, ChatMessage> lastMessageMap, Long currentMemberId) {
        return chatRoomStates.stream()
            .map(state -> createChatRoomResponse(state, lastMessageMap, currentMemberId))
            .sorted(Comparator.comparing(
                ChatRoomResponse::getLastMessageCreatedAt,
                Comparator.reverseOrder()))
            .collect(Collectors.toList());
    }

    private ChatRoomResponse createChatRoomResponse(ChatRoomState chatRoomState, Map<Long, ChatMessage> lastMessageMap, Long currentMemberId) {

        ChatRoom chatRoom = chatRoomState.getChatRoom();
        ChatMessage lastChatMessage = lastMessageMap.getOrDefault(chatRoom.getId(), null);

        // 현재 사용자와 상대방을 구분
        Member oppositeMember = chatRoom.getOppositeMember(currentMemberId);

        return ChatRoomResponse.of(chatRoomState, lastChatMessage, oppositeMember);
    }
}
