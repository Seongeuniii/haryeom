import { ChangeEvent, useEffect, useRef, useState, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import useStomp, { ISubscription } from '@/hooks/useStomp';
import chatSessionAtom from '@/recoil/atoms/chat';
import MatchingStage from '@/components/MatchingStage';
import Send from '../icons/Send';
import Chat from './Chat';
import { IRequestMatchingStatus, IResponseMatchingStatus } from '@/apis/chat/chat';
import userSessionAtom from '@/recoil/atoms/userSession';
import { getChatMessages } from '@/apis/chat/get-chat-message';

interface IReceiveChat {
    messageId: string;
    senderMemberId: number;
    content: string;
    createdAt: string;
}

const Chatting = () => {
    const userSession = useRecoilValue(userSessionAtom);
    const chatSession = useRecoilValue(chatSessionAtom);
    const [chatMessages, setChatMessages] = useState<IReceiveChat[]>([]);
    const [message, setMessage] = useState('');
    const [requestMatchingStatus, setRequestMatchingStatus] = useState<IRequestMatchingStatus>();
    const [responseMatchingStatus, setResponseMatchingStatus] =
        useState<IResponseMatchingStatus[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const chatListRef = useRef<HTMLDivElement | null>(null); // 채팅 목록을 위한 ref
    const lastMessageIdRef = useRef<string | null>(null);
    const observerRef = useRef(null); // Observer 대상이 될 요소를 위한 ref
    const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);
    const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true);
    const currentScrollPosition = chatListRef.current?.scrollTop; // 현재 스크롤 위치 저장
    const currentScrollHeight = chatListRef.current?.scrollHeight; // 로딩 전 총 스크롤 높이

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

    //==========메시지 목록 조회 API==========
    const loadMessages = async (
        lastMessageId: string | null = null,
        initialLoad: boolean = false
    ) => {
        setIsLoading(true);
        if (chatListRef.current) {
            try {
                if (chatSession.chatRoomId == null) return;
                const messages = await getChatMessages(chatSession.chatRoomId, lastMessageId, 30); // 메시지 개수
                // 메시지 배열이 비어 있으면 로딩을 멈추고 초기 로드가 아니라면 바로 함수 종료
                if (messages && messages.length === 0) {
                    setHasMoreMessages(false); // 더 이상 로드할 메시지가 없음을 나타냅니다.
                    setIsLoading(false);
                    return;
                }
                if (messages && messages.length > 0) {
                    const orderedMessages = messages.reverse(); // API로부터 받은 메시지 배열을 뒤집습니다.
                    if (initialLoad) {
                        setChatMessages(orderedMessages); // 초기 로딩 시 메시지 배열을 그대로 사용합니다.
                        setInitialLoadComplete(true); // 초기 로딩 완료 상태 업데이트
                    } else {
                        setChatMessages((prevMessages) => [...orderedMessages, ...prevMessages]); // 추가 로딩 시 메시지 배열을 뒤집어 상태에 추가합니다.
                    }
                    // 메시지 로딩 후, lastMessageIdRef.current 업데이트
                    if (messages.length > 0) {
                        // 가장 마지막에 불러온 메시지의 ID를 lastMessageId로 설정
                        lastMessageIdRef.current = messages[0].messageId;
                    }
                } else {
                    setHasMoreMessages(false);
                }
            } catch (error) {
                console.error('Failed to load messages:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 초기 메시지   로딩
        loadMessages(null, true);
    }, [chatSession.chatRoomId]); // chatSession.chatRoomId가 변경될 때마다 초기 메시지 로드

    useEffect(() => {
        if (initialLoadComplete && chatListRef.current && chatMessages.length > 0) {
            const newScrollHeight = chatListRef.current.scrollHeight;
            if (currentScrollHeight !== undefined && currentScrollPosition !== undefined) {
                chatListRef.current.scrollTop =
                    newScrollHeight - currentScrollHeight + currentScrollPosition;
            }
        }
    }, [chatMessages.length, initialLoadComplete]); // chatMessages.length를 의존성으로 사용하여 다시 실행될 수 있도록 합니다.

    useEffect(() => {
        // IntersectionObserver 로직...
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isLoading && hasMoreMessages) {
                        loadMessages(lastMessageIdRef.current); // 사용자가 목록 상단에 도달했을 때 메시지 로드
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect(); // 컴포넌트 언마운트 시 observer 해제
    }, [isLoading, loadMessages]);

    useEffect(() => {
        return () => {
            stompClient?.disconnect();
        };
    }, [stompClient]);

    return (
        <StyledChatting>
            <MatchingStage
                requestStatus={requestMatchingStatus}
                responseStatus={responseMatchingStatus}
            />
            <ChatList ref={chatListRef}>
                <Anchor ref={observerRef} /> {/* 고정 참조 요소 */}
                {chatMessages.map((chat, index) => (
                    <Chat
                        message={chat.content}
                        isMyChat={chat.senderMemberId === userSession?.memberId}
                        key={`chat_${index}`}
                    />
                ))}
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
const Anchor = styled.div`
    height: 0;
`;
export default Chatting;
