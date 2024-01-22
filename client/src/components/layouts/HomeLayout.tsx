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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const ContainerWrapper = styled.main`
    width: 80%;
    max-width: 1200px;
    height: calc(100% - 3.5em);
`;

export default HomeLayout;
