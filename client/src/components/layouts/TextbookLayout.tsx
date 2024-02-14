import { ReactNode } from 'react';
import styled from 'styled-components';
import ChatContainer from '@/containers/ChatContainer';
import { ITextbook } from '@/apis/homework/homework';

interface TextbookLayoutProps {
    textbookData: ITextbook;
    children: ReactNode;
}

const TextbookLayout = ({ textbookData, children }: TextbookLayoutProps) => {
    return (
        <StyledTextbookLayout>
            <HeaderWrapper>
                <Header>
                    <TextbookName>{textbookData.textbookName}</TextbookName>
                    <Range>p.1 ~ p.{textbookData.totalPage}</Range>
                </Header>
            </HeaderWrapper>
            <ContainerWrapper>{children}</ContainerWrapper>
            <ChatContainer />
        </StyledTextbookLayout>
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
    width: 70%;
    height: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        & {
            width: 100%;
        }
    }
`;

const TextbookName = styled.span`
    margin: 0 0.7em 0 2em;
    font-size: 18px;
    font-weight: 700;
`;

const Range = styled.div`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const StyledTextbookLayout = styled.div`
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

export default TextbookLayout;
