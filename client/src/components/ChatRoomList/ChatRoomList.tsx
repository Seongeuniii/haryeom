import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import chatSessionAtom from '@/recoil/atoms/chat';
import ChatRoomPreview from '@/components/ChatRoomList/ChatRoomPreview';

const ChatRoomList = () => {
    const [chatSession, setChatSession] = useRecoilState(chatSessionAtom);

    return (
        <StyledChatRoomList>
            <ChatRoomPreview
                chatRoom={{
                    chatRoomId: 1,
                    role: 'TEACHER',
                    profileUrl: '/images/student-boy.png',
                    name: '김성은',
                    lastMessage: '안녕하세요!',
                    lastMessageCreatedAt: '오전 10:00',
                    unreadMessageCount: 2,
                }}
                joinChat={() =>
                    setChatSession((prev) => {
                        return { ...prev, chatRoomId: 1 };
                    })
                }
            />
            <ChatRoomPreview
                chatRoom={{
                    chatRoomId: 1,
                    role: 'TEACHER',
                    profileUrl: '/images/student-boy.png',
                    name: '김성은',
                    lastMessage: '안녕하세요!',
                    lastMessageCreatedAt: '오전 10:00',
                    unreadMessageCount: 2,
                }}
                joinChat={() => {
                    setChatSession((prev) => {
                        return { ...prev, chatRoomId: 1 };
                    });
                }}
            />
        </StyledChatRoomList>
    );
};

const StyledChatRoomList = styled.div``;

export default ChatRoomList;
