import { ReactNode } from 'react';
import styled from 'styled-components';
import ChatContainer from '@/containers/ChatContainer';

interface ClassLayoutProps {
    children: ReactNode;
}

const ClassLayout = ({ children }: ClassLayoutProps) => {
    return (
        <StyledClassLayout>
            <HeaderWrapper>
                <Header>수업</Header>
            </HeaderWrapper>
            <ContainerWrapper>{children}</ContainerWrapper>
            <ChatContainer />
        </StyledClassLayout>
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

const StyledClassLayout = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const ContainerWrapper = styled.main`
    width: 70%;
    height: calc(100% - 3em);
    display: flex;

    @media screen and (max-width: 1200px) {
        & {
            width: 100%;
        }
    }
`;

export default ClassLayout;
