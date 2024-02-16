import styled from 'styled-components';

interface ChatProps {
    isMyChat: boolean;
    message: string;
}

const Chat = ({ isMyChat, message }: ChatProps) => {
    return (
        <StyledChat isMyChat={isMyChat}>
            <Content isMyChat={isMyChat}>
                <span> {message}</span>
            </Content>
        </StyledChat>
    );
};

const StyledChat = styled('div')<{ isMyChat: boolean }>`
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    ${({ isMyChat }) => isMyChat && 'align-items: flex-end'}
`;

const Content = styled('div')<{ isMyChat: boolean }>`
    width: fit-content;
    max-width: 75%;
    padding: 10px;
    border-radius: 8px;
    background-color: ${({ isMyChat, theme }) => (isMyChat ? theme.PRIMARY : theme.BORDER_LIGHT)};
    color: ${({ isMyChat }) => (isMyChat ? 'white' : 'black')};
`;

export default Chat;
