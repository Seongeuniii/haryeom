import { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useStomp, { ISubscription } from '@/hooks/useStomp';
import chatSessionAtom from '@/recoil/atoms/chat';
import MatchingStage from '@/components/MatchingStage';
import { IRequestMatchingStatus, IResponseMatchingStatus } from '@/apis/matching/matching';

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
                console.log(data);
            },
        },
        {
            name: 'resultOfMatchingRequest',
            destination: `/topic/chatroom/${chatSession.chatRoomId}/response`,
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
        const destination = `/app/chatroom/${chatSession.chatRoomId}/message`;
        stompClient.send(destination, {}, JSON.stringify({ content: message }));
        setMessage('');
    };

    return (
        <StyledChatting>
            <MatchingStage
                requestStatus={requestMatchingStatus}
                responseStatus={responseMatchingStatus}
            />
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
    display: flex;
    flex-direction: column;
`;

const TestForm = styled.div``;

const ChatList = styled.div``;

export default Chatting;
