import Head from 'next/head';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import ChatContainer from '@/containers/ChatContainer';
import userSessionAtom from '@/recoil/atoms/userSession';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const userSession = useRecoilValue(userSessionAtom);

    return (
        <StyledMainLayout>
            <Head>
                <title>하렴</title>
                <meta name="description" content="" />
            </Head>
            {children}
            {userSession && <ChatContainer />}
        </StyledMainLayout>
    );
};

const StyledMainLayout = styled.main`
    width: 100%;
    height: 100%;
`;

export default MainLayout;
