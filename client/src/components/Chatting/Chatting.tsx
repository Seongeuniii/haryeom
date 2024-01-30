import styled from 'styled-components';
import ChatStatus from './ChatStatus';
import useStomp, { ISubscription } from '@/hooks/useStomp';
import { ChangeEvent, useState } from 'react';

interface IReceiveChat {
    messageId: string;
    senderMemberId: number;
    content: string;
    createdAt: string;
}

interface ChattingProps {
    chatRoomId: number;
    chattingWithName: string;
}

const Chatting = ({ chatRoomId, chattingWithName }: ChattingProps) => {
    const [chatMessages, setChatMessages] = useState<IReceiveChat[]>([]);
    const [message, setMessage] = useState('');
    // TODO: subscriptions 리렌더
    const subscriptions: ISubscription[] = [
        {
            name: 'receiveMessage',
            destination: `/topic/chatroom/${chatRoomId}`,
            callback: (message) => {
                const data = JSON.parse(message.body);
                const chatMessage: IReceiveChat = data;
                setChatMessages((prev) => [...prev, chatMessage]);
            },
        },
        {
            name: 'matchingRequest',
            destination: `/topic/chatroom/${chatRoomId}/request`,
            callback: (message) => {
                const data = JSON.parse(message.body);
                console.log(data);
            },
        },
        {
            name: 'resultOfMatchingRequest',
            destination: `/topic/chatroom/${chatRoomId}/response`,
            callback: (message) => {
                const data = JSON.parse(message.body);
                console.log(data);
            },
        },
    ];
    const { stompClient } = useStomp({ subscriptions });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };
    const sendMessage = () => {
        if (!stompClient) return;
        const destination = `/app/chatroom/${chatRoomId}/message`;
        stompClient.send(destination, {}, JSON.stringify({ content: message }));
        setMessage('');
    };

    return (
        <StyledChatting>
            <ChatStatus chatRoomId={chatRoomId} />
            <TestForm>
                <input type="text" value={message} onChange={handleChange} />
                <button onClick={sendMessage}>전송</button>
            </TestForm>
            <ChatList>
                {chatMessages.map((chat, index) => (
                    <div key={`chat_${index}`}>{chat.content}</div>
                ))}
            </ChatList>
        </StyledChatting>
    );
};

const StyledChatting = styled.div`
    width: 100%;
    height: 100%;
`;

const TestForm = styled.div``;

const ChatList = styled.div``;

export default Chatting;
