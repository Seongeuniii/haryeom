import Head from 'next/head';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <StyledMainLayout>
            <Head>
                <title>하렴</title>
                <meta name="description" content="" />
            </Head>
            {children}
        </StyledMainLayout>
    );
};

const StyledMainLayout = styled.main`
    width: 100%;
    height: 100%;
`;

export default MainLayout;
