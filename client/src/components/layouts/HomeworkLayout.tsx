import { ReactNode } from 'react';
import styled from 'styled-components';
import ChatContainer from '@/containers/ChatContainer';
import { IHomework } from '@/apis/homework/homework';

interface HomeworkLayoutProps {
    homeworkData: IHomework;
    children: ReactNode;
}

const HomeworkLayout = ({ homeworkData, children }: HomeworkLayoutProps) => {
    return (
        <StyledHomeworkLayout>
            <HeaderWrapper>
                <Header>
                    <TextbookName>{homeworkData.textbook.textbookName}</TextbookName>
                    <Range>
                        p.{homeworkData.startPage} ~ p.{homeworkData.endPage}
                    </Range>
                </Header>
            </HeaderWrapper>
            <ContainerWrapper>{children}</ContainerWrapper>
            <ChatContainer />
        </StyledHomeworkLayout>
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
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextbookName = styled.span`
    margin-right: 0.7em;
    font-size: 18px;
    font-weight: 700;
`;

const Range = styled.div`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const StyledHomeworkLayout = styled.div`
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

export default HomeworkLayout;
