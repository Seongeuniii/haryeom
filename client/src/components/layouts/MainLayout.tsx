import ChatContainer from '@/containers/ChatContainer';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <StyledMainLayout>{children}</StyledMainLayout>
            {open ? (
                <ChatContainer setOpen={setOpen} />
            ) : (
                <ChatButton onClick={() => setOpen(true)}>...</ChatButton>
            )}
        </>
    );
};

const StyledMainLayout = styled.main`
    width: 100vw;
    height: 100vh;
`;

const ChatButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    z-index: 100;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    border-radius: 1em;
`;

export default MainLayout;
