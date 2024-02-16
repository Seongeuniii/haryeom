import { ReactNode } from 'react';
import styled from 'styled-components';

interface ClassLayoutProps {
    children: ReactNode;
}

const ClassLayout = ({ children }: ClassLayoutProps) => {
    return (
        <StyledClassLayout>
            <ContainerWrapper>{children}</ContainerWrapper>
            {/* <ChatContainer /> */}
        </StyledClassLayout>
    );
};

const StyledClassLayout = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const ContainerWrapper = styled.main`
    width: 85%;
    height: 100%;
    display: flex;

    @media screen and (max-width: 1200px) {
        & {
            width: 100%;
        }
    }
`;

export default ClassLayout;
