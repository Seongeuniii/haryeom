import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import chatSessionAtom from '@/recoil/atoms/chat';
import ChatRoomPreview from '@/components/ChatRoomList/ChatRoomPreview';
import { getChatRooms } from '@/apis/chat/get-chat-rooms';
import { IChatRoom } from '@/apis/chat/chat';

interface ChatRoomListProps {
    chatRooms: IChatRoom[] | undefined;
    joinChatRoom: (roomId: number) => void;
}

const ChatRoomList = ({ chatRooms, joinChatRoom }: ChatRoomListProps) => {
    return (
        <StyledChatRoomList>
            {chatRooms?.map((chatRoom, index) => {
                return (
                    <ChatRoomPreview
                        chatRoom={chatRoom}
                        joinChat={() => joinChatRoom(chatRoom.chatRoomId)}
                        key={`preview_${index}`}
                    />
                );
            })}
        </StyledChatRoomList>
    );
};

const StyledChatRoomList = styled.div`
    height: 100%;
    overflow: scroll;
`;

export default ChatRoomList;
