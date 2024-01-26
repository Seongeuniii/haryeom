import { useState } from 'react';
import styled from 'styled-components';
import ChatRoomPreview from '@/components/ChatRoomPreview';
import Chatting from '@/components/Chatting';
import Chat from '@/components/icons/Chat';
import Close from '@/components/icons/Close';
import GoBack from '@/components/icons/GoBack';

interface ChatContainerProps {}

// eslint-disable-next-line no-empty-pattern
const ChatContainer = ({}: ChatContainerProps) => {
    const [open, setOpen] = useState(false);
    const [joinChatRoom, setJoinChatRoom] = useState(false);
    const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(null);

    const joinChat = (chatRoomId: number) => {
        setSelectedChatRoomId(chatRoomId);
        setJoinChatRoom(true);
    };

    if (!open) {
        return (
            <ChatButton onClick={() => setOpen(true)}>
                <Chat />
            </ChatButton>
        );
    } else {
        return (
            <StyledChatContainer>
                <CloseChatButton onClick={() => setOpen(false)}>
                    <Close />
                </CloseChatButton>
                {!joinChatRoom ? (
                    <ChatRoomList>
                        <Header>채팅</Header>
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
                            joinChat={joinChat}
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
                            joinChat={joinChat}
                        />
                    </ChatRoomList>
                ) : (
                    <ChatRoom>
                        <Header>
                            <GoChatRoomListButton onClick={() => setJoinChatRoom(false)}>
                                <GoBack />
                            </GoChatRoomListButton>
                            <span>김성은 선생님</span>
                        </Header>
                        {selectedChatRoomId && <Chatting chatRoomId={selectedChatRoomId} />}
                    </ChatRoom>
                )}
            </StyledChatContainer>
        );
    }
};

const ChatButton = styled.button`
    position: fixed;
    bottom: 3em;
    right: 3em;
    width: 65px;
    height: 65px;
    z-index: 100;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    border-radius: 1em;
`;

const StyledChatContainer = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 350px;
    height: 550px;
    z-index: 100;
    border-radius: 1.6em;
    background-color: white;
    border: 2px solid ${({ theme }) => theme.PRIMARY_LIGHT};
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
    padding: 2.5em;
`;

const CloseChatButton = styled.button`
    position: absolute;
    top: 27px;
    right: 27px;
    width: 13px;
    height: 13px;
`;

const Header = styled.header`
    font-size: 1.2em;
    font-weight: bold;
    padding-bottom: 0.8em;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    display: flex;
`;

const GoChatRoomListButton = styled.button`
    margin-right: 12px;
`;

const ChatRoomList = styled.div``;

const ChatRoom = styled.div``;

export default ChatContainer;
