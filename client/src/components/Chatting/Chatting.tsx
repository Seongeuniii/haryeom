import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useStomp, { ISubscription } from '@/hooks/useStomp';
import chatSessionAtom from '@/recoil/atoms/chat';
import MatchingStage from '@/components/MatchingStage';
import { IRequestMatchingStatus, IResponseMatchingStatus } from '@/apis/matching/matching';
import Send from '../icons/Send';
import Chat from './Chat';

interface IReceiveChat {
    messageId: string;
    senderMemberId: number;
    content: string;
    createdAt: string;
}

const Chatting = () => {
    const chatSession = useRecoilValue(chatSessionAtom);
    const [chatMessages, setChatMessages] = useState<IReceiveChat[]>([]);
    const [message, setMessage] = useState('');
    const [requestMatchingStatus, setRequestMatchingStatus] = useState<IRequestMatchingStatus>();
    const [responseMatchingStatus, setResponseMatchingStatus] = useState<IResponseMatchingStatus>();
    const lastChatRef = useRef<HTMLDivElement | null>(null);

    // TODO: subscriptions 리렌더
    const subscriptions: ISubscription[] = [
        {
            name: 'receiveMessage',
            destination: `/topic/chatroom/${chatSession.chatRoomId}`,
            callback: (message) => {
                const data = JSON.parse(message.body);
                const chatMessage: IReceiveChat = data;
                setChatMessages((prev) => [...prev, chatMessage]);
            },
        },
        {
            name: 'matchingRequest',
            destination: `/topic/chatroom/${chatSession.chatRoomId}/request`,
            callback: (message) => {
                const data = JSON.parse(message.body);
                setRequestMatchingStatus(data);
            },
        },
        {
            name: 'resultOfMatchingRequest',
            destination: `/topic/chatroom/${chatSession.chatRoomId}/response`,
            callback: (message) => {
                const data = JSON.parse(message.body);
                setResponseMatchingStatus(data);
            },
        },
    ];
    const { stompClient } = useStomp({ subscriptions, roomId: chatSession.chatRoomId as number });

    const sendMessage = () => {
        if (!stompClient || !message) return;
        const destination = `/app/chatroom/${chatSession.chatRoomId}/message`;
        stompClient.send(destination, {}, JSON.stringify({ content: message }));
        setMessage('');
    };

    useEffect(() => {
        if (!lastChatRef.current) return;
        lastChatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, [chatMessages.length]);

    return (
        <StyledChatting>
            <MatchingStage
                requestStatus={requestMatchingStatus}
                responseStatus={responseMatchingStatus}
            />
            <ChatList>
                {chatMessages.map((chat, index) => (
                    <Chat message={chat.content} isMyChat={true} key={`chat_${index}`} />
                ))}
                <div ref={lastChatRef}></div>
            </ChatList>
            <ChatForm onSubmit={(e) => e.preventDefault()}>
                <ChatInput
                    type="text"
                    value={message}
                    placeholder="메시지를 입력하세요"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SendButton onClick={sendMessage}>
                    <Send />
                </SendButton>
            </ChatForm>
        </StyledChatting>
    );
};

const StyledChatting = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ChatList = styled.div`
    flex: 1;
    overflow-y: scroll;
`;

const ChatForm = styled.form`
    width: 100%;
    margin: 1em 0 2em 0;
    padding: 7px 10px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 9px;
    display: flex;
    justify-content: space-between;
`;

const ChatInput = styled.input`
    width: 80%;
    font-size: 14px;
    border: none;
    &:focus {
        outline: none;
    }
`;

const SendButton = styled.button`
    width: 27px;
    height: 27px;
    padding-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    cursor: pointer;
    border: none;
    background: ${({ theme }) => theme.BORDER_LIGHT};

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default Chatting;
