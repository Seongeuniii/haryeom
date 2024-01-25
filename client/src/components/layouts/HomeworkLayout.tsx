import { ReactNode } from 'react';
import styled from 'styled-components';
import ChatContainer from '@/containers/ChatContainer';

interface HomeworkLayoutProps {
    children: ReactNode;
}

const HomeworkLayout = ({ children }: HomeworkLayoutProps) => {
    return (
        <StyledHomeworkLayout>
            <HeaderWrapper>
                <Header>호랑이 문제집 P.12 ~ P.13</Header>
            </HeaderWrapper>
            <ContainerWrapper>{children}</ContainerWrapper>
            <ChatContainer />
        </StyledHomeworkLayout>
    );
};

const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const Header = styled.div`
    width: 80%;
    height: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledHomeworkLayout = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const ContainerWrapper = styled.main`
    width: 80%;
    max-width: 1200px;
    height: calc(100% - 3em);
    display: flex;
`;

export default HomeworkLayout;
