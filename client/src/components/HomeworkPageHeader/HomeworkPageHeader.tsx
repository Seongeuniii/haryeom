import React from 'react';
import styled from 'styled-components';
import { IHomework } from '@/apis/homework/homework';

interface HomeworkPageHeader {
    homeworkData: IHomework;
    handleSave: () => Promise<void>;
    handleSubmit: () => Promise<void>;
}

const HomeworkPageHeader = ({ homeworkData, handleSave, handleSubmit }: HomeworkPageHeader) => {
    return (
        <StyledHomeworkPageHeader>
            <Header>
                <TextbookName>{homeworkData.textbook.textbookName}</TextbookName>
                <HomeworkRange>
                    p.{homeworkData.startPage} ~ p.{homeworkData.endPage}
                </HomeworkRange>
            </Header>
            <SubmitButtons>
                <SubmitButton onClick={handleSave}>임시저장</SubmitButton>
                <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
            </SubmitButtons>
        </StyledHomeworkPageHeader>
    );
};

const StyledHomeworkPageHeader = styled.header`
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

const HomeworkRange = styled.div`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const SubmitButtons = styled.div`
    position: absolute;
    right: 16.5%;
    display: flex;
    gap: 7px;

    @media screen and (max-width: 1200px) {
        & {
            right: 2%;
        }
    }
`;

const SubmitButton = styled.button`
    padding: 5px 12px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    color: white;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        transition: all 0.5s;
    }
`;

export default React.memo(HomeworkPageHeader);
