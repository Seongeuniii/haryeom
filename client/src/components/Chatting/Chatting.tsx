import styled from 'styled-components';
import ChatStatus from './ChatStatus';

interface ChattingProps {
    chatRoomId: number;
}

const Chatting = ({ chatRoomId }: ChattingProps) => {
    return (
        <StyledChatting>
            <ChatStatus chatRoomId={chatRoomId} />
        </StyledChatting>
    );
};

const StyledChatting = styled.div`
    width: 100%;
    height: 100%;
`;

export default Chatting;
