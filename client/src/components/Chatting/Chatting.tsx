/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import ChatStatus from './ChatStatus';
import { CompatClient, Stomp } from '@stomp/stompjs';

interface ChattingProps {
    chatRoomId: number;
    chattingWithName: string;
}

const Chatting = ({ chatRoomId, chattingWithName }: ChattingProps) => {
    const [stompClient, setStompClient] = useState<CompatClient>();
    const [message, setMessage] = useState('');
    const [chatList, setChatList] = useState<{ text: string }[]>([{ text: '첫 번째 메시지' }]);

    useEffect(() => {
        const socket = new SockJS('http://70.12.247.253:8080/chatroom');
        const stomp = Stomp.over(socket);
        stomp.connect({}, () => {
            console.log('Connected to WebSocket');
            // 채팅방에 연결되었음을 서버에 전송
            stomp.send(`/app/chatroom/${chatRoomId}/connect`, {});
            // 채팅 메시지 구독CompatClient
            const subscription = stomp.subscribe(`/topic/chatroom/${chatRoomId}`, (message) => {
                const data = JSON.parse(message.body);
                const { content } = data;
                console.log(content);
                setChatList((prev) => [...prev, { text: content }]);
            });
            setStompClient(stomp);
            return () => {
                subscription.unsubscribe();
            };
        });
        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {
                    console.log('Disconnected from WebSocket');
                });
            }
        };
    }, [chatRoomId]);

    const sendMessage = () => {
        if (!stompClient) {
            return;
        }
        // 메시지 전송
        stompClient.send(
            `/app/chatroom/${chatRoomId}/message`,
            {},
            JSON.stringify({ content: message })
        );
        setMessage('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    return (
        <StyledChatting>
            <ChatStatus chatRoomId={chatRoomId} />
            <TestForm>
                <input type="text" value={message} onChange={handleChange} />
                <button onClick={sendMessage}>전송</button>
            </TestForm>
            <ChatList>
                {chatList.map((chat, index) => (
                    <div key={`chat_${index}`}>{chat.text}</div>
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
