import { ReactNode } from 'react';
import styled from 'styled-components';
import ChatContainer from '@/containers/ChatContainer';

interface ClassLayoutProps {
    children: ReactNode;
    subject: string;
    title: string;
    time: string;
}

const ClassLayout = ({ children, subject, title, time }: ClassLayoutProps) => {
    return (
        <StyledClassLayout>
            <HeaderWrapper>
                <Header>
                    <Title>
                        {subject} | {title}
                    </Title>
                    <Time>{time}</Time>
                </Header>
            </HeaderWrapper>
            <ContainerWrapper>{children}</ContainerWrapper>
            {/* <ChatContainer /> */}
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
    padding-left: 10%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.span`
    font-size: 18px;
    font-weight: 700;
`;

const Time = styled.span`
    margin-left: 1em;
    font-size: 14px;
    color: ${({ theme }) => theme.LIGHT_BLACK};
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
