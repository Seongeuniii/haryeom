import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@/components//Header';

interface HomeLayoutProps {
    children: ReactNode;
}

const RegisterLayout = ({ children }: HomeLayoutProps) => {
    return (
        <StyledRegisterLayout>
            <Header />
            <ContainerWrapper>{children}</ContainerWrapper>
        </StyledRegisterLayout>
    );
};

const StyledRegisterLayout = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: end;
`;

const ContainerWrapper = styled.main`
    width: 100%;
    height: calc(100% - 4em);
    display: flex;
    overflow: scroll;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
`;

export default RegisterLayout;
