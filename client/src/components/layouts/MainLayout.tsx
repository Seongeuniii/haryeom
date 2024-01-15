import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return <StyledMainLayout>{children}</StyledMainLayout>;
};

const StyledMainLayout = styled.main`
    width: 100vw;
    height: 100vh;
`;

export default MainLayout;
