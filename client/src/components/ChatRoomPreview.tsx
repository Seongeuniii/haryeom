import { IChatRoom } from '@/apis/chat/chat';
import styled from 'styled-components';

interface ChatRoomPreviewProps {
    chatRoom: IChatRoom;
}

const ChatRoomPreview = ({ chatRoom }: ChatRoomPreviewProps) => {
    return (
        <StyledChatRoomPreview>
            <ProfileImg src={chatRoom.profileUrl} alt="프로필 사진" />
            <MiddleBlockWrapper>
                <Name>
                    {chatRoom.name}
                    {chatRoom.role === 'teacher' ? ' 선생님' : ' 학생'}
                </Name>
                <LastMessage>{chatRoom.lastMessage}</LastMessage>
            </MiddleBlockWrapper>
            <EndBlockWrapper>
                <LastMessageCreatedAt>{chatRoom.lastMessageCreatedAt}</LastMessageCreatedAt>
                <UnreadMessageCount>{chatRoom.unreadMessageCount}</UnreadMessageCount>
            </EndBlockWrapper>
        </StyledChatRoomPreview>
    );
};

const StyledChatRoomPreview = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    cursor: pointer;
`;

const ProfileImg = styled.img`
    height: 53px;
    width: 53px;
    border-radius: 100%;
    margin-right: 13px;
    background-color: ${({ theme }) => theme.BORDER_LIGHT};
`;

const MiddleBlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const Name = styled.span`
    font-size: 0.8em;
`;

const LastMessage = styled.span``;

const EndBlockWrapper = styled.div`
    margin-left: auto;
    font-size: 0.7em;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 3px;
`;

const LastMessageCreatedAt = styled.span`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const UnreadMessageCount = styled.div`
    width: 13px;
    height: 13px;
    padding-top: 1px;
    text-align: center;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
`;

export default ChatRoomPreview;
