import styled from 'styled-components';
import { IChatRoom } from '@/apis/chat/chat';
import { getFormattedYearMonthDay } from '@/utils/time';

interface ChatRoomPreviewProps {
    chatRoom: IChatRoom;
    joinChat: (chatRoomId: number) => void;
}

const ChatRoomPreview = ({ chatRoom, joinChat }: ChatRoomPreviewProps) => {
    return (
        <StyledChatRoomPreview onClick={() => joinChat(chatRoom.chatRoomId)}>
            <ProfileImg src={chatRoom.oppositeMember.profileUrl} alt="프로필 사진" />
            <MiddleBlockWrapper>
                <Name>{chatRoom.oppositeMember.name}</Name>

                <LastMessage>
                    {chatRoom.lastMessage !== null
                        ? chatRoom.lastMessage
                        : '채팅 메시지를 보내보세요.'}
                </LastMessage>
            </MiddleBlockWrapper>
            <EndBlockWrapper>
                <LastMessageCreatedAt>
                    {getFormattedYearMonthDay(new Date(chatRoom.lastMessageCreatedAt))}
                </LastMessageCreatedAt>
                {chatRoom.unreadMessageCount == 0 ? (
                    <UnreadMessageCountBlank></UnreadMessageCountBlank>
                ) : (
                    <UnreadMessageCount>{chatRoom.unreadMessageCount}</UnreadMessageCount>
                )}
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
    width: 45px;
    height: 45px;
    margin: 0 12px 0 5px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.BORDER_LIGHT};
`;

const MiddleBlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const Name = styled.span`
    font-size: 0.8em;
    margin-bottom: 3px;
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
    width: 17px;
    height: 17px;
    padding-top: 3px;
    margin-top: 3px;
    text-align: center;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
`;
const UnreadMessageCountBlank = styled.div`
    width: 17px;
    height: 17px;
    padding-top: 3px;
    margin-top: 3px;
    text-align: center;
    border-radius: 100%;
`;

export default ChatRoomPreview;
