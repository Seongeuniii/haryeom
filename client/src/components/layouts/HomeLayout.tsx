import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@/components//Header';
import ChatContainer from '@/containers/ChatContainer';

interface HomeLayoutProps {
    children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <StyledHomeLayout>
            <Header />
            <ContainerWrapper>{children}</ContainerWrapper>
            <ChatContainer />
        </StyledHomeLayout>
    );
};

const StyledHomeLayout = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const ContainerWrapper = styled.main`
    width: 75%;
    max-width: 1200px;
    height: calc(100% - 4em);
    display: flex;
`;

export default HomeLayout;
