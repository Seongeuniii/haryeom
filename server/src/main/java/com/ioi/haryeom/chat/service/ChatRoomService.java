package com.ioi.haryeom.chat.service;

import com.ioi.haryeom.chat.domain.ChatRoom;
import com.ioi.haryeom.chat.repository.ChatRoomRepository;
import com.ioi.haryeom.member.domain.Member;
import com.ioi.haryeom.member.domain.Teacher;
import com.ioi.haryeom.member.exception.MemberNotFoundException;
import com.ioi.haryeom.member.exception.TeacherNotFoundException;
import com.ioi.haryeom.member.repository.MemberRepository;
import com.ioi.haryeom.member.repository.TeacherRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final TeacherRepository teacherRepository;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;

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
}
