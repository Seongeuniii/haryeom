import ChatRoomPreview from '@/components/ChatRoomPreview';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

interface ChatContainerProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatContainer = ({ setOpen }: ChatContainerProps) => {
    const [showRoomList, setShowRoomList] = useState(true);

    return (
        <StyledChatContainer>
            <CloseChatButton onClick={() => setOpen(false)}>X</CloseChatButton>
            {showRoomList ? (
                <ChatRoomList>
                    <Header>채팅 목록</Header>
                    <ChatRoomPreview
                        chatRoom={{
                            chatRoomId: 1,
                            role: 'teacher',
                            profileUrl: '/images/student-boy.png',
                            name: '김성은',
                            lastMessage: '안녕하세요!',
                            lastMessageCreatedAt: '오전 10:00',
                            unreadMessageCount: 2,
                        }}
                    />
                    <ChatRoomPreview
                        chatRoom={{
                            chatRoomId: 1,
                            role: 'teacher',
                            profileUrl: '/images/student-boy.png',
                            name: '김성은',
                            lastMessage: '안녕하세요!',
                            lastMessageCreatedAt: '오전 10:00',
                            unreadMessageCount: 2,
                        }}
                    />
                    <ChatRoomPreview
                        chatRoom={{
                            chatRoomId: 1,
                            role: 'teacher',
                            profileUrl: '/images/student-boy.png',
                            name: '김성은',
                            lastMessage: '안녕하세요!',
                            lastMessageCreatedAt: '오전 10:00',
                            unreadMessageCount: 2,
                        }}
                    />
                    <ChatRoomPreview
                        chatRoom={{
                            chatRoomId: 1,
                            role: 'teacher',
                            profileUrl: '/images/student-boy.png',
                            name: '김성은',
                            lastMessage: '안녕하세요!',
                            lastMessageCreatedAt: '오전 10:00',
                            unreadMessageCount: 2,
                        }}
                    />
                </ChatRoomList>
            ) : (
                <ChatRoom>
                    <Header>
                        <button onClick={() => setShowRoomList(true)}>exit</button>
                        <span>김성은 선생님</span>
                    </Header>
                </ChatRoom>
            )}
        </StyledChatContainer>
    );
};

const StyledChatContainer = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 370px;
    height: 550px;
    z-index: 100;
    border-radius: 1.6em;
    background-color: white;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
    padding: 2.5em;
`;

const CloseChatButton = styled.button`
    position: absolute;
    top: 25px;
    right: 25px;
`;

const Header = styled.header`
    font-size: 1.2em;
    font-weight: bold;
    padding-bottom: 0.8em;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const ChatRoomList = styled.div``;

const ChatRoom = styled.div``;

export default ChatContainer;
