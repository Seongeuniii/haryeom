import { ReactNode } from 'react';
import styled from 'styled-components';
import ChatContainer from '@/containers/ChatContainer';
import { IHomework } from '@/apis/homework/homework';

interface HomeworkLayoutProps {
    homeworkData: IHomework;
    children: ReactNode;
    handleSubmit: () => void;
}

const HomeworkLayout = ({ homeworkData, children, handleSubmit }: HomeworkLayoutProps) => {
    return (
        <StyledHomeworkLayout>
            <HeaderWrapper>
                <Header>
                    <TextbookName>{homeworkData.textbook.textbookName}</TextbookName>
                    <Range>
                        p.{homeworkData.startPage} ~ p.{homeworkData.endPage}
                    </Range>
                </Header>
                <SubmitHomeworkButton onClick={handleSubmit}>제출하기</SubmitHomeworkButton>
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

const SubmitHomeworkButton = styled.button`
    position: absolute;
    right: 16.5%;
    padding: 7px 12px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: white;

    @media screen and (max-width: 1200px) {
        & {
            right: 2%;
        }
    }

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        transition: all 0.5s;
    }
`;

export default HomeworkLayout;
