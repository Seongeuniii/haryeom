import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@/components//Header';

interface HomeLayoutProps {
    children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <StyledHomeLayout>
            <Header navLinks={[]} />
            {children}
        </StyledHomeLayout>
    );
};

const StyledHomeLayout = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
`;

export default HomeLayout;
