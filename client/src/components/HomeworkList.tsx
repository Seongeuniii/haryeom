import Link from 'next/link';
import styled from 'styled-components';

const HomeworkList = () => {
    return (
        <StyledHomeworkList>
            <HomeworkListHeader>숙제 목록</HomeworkListHeader>
            <HomeworkTableTitle>
                <State className="homework-list__header">구분</State>
                <Deadline className="homework-list__header">마감일</Deadline>
                <Resource className="homework-list__header">학습자료</Resource>
                <Scope className="homework-list__header">범위</Scope>
            </HomeworkTableTitle>
            <HomeworkCards>
                <HomeworkCard>
                    <State>진행중</State>
                    <Deadline>2024. 1. 8 (수)</Deadline>
                    <Resource>호랭이 문제집</Resource>
                    <Scope>p. 1 ~ 10</Scope>
                </HomeworkCard>
                <HomeworkCard>
                    <State>진행중</State>
                    <Deadline>2024. 1. 8 (수)</Deadline>
                    <Resource>호랭이 문제집</Resource>
                    <Scope>p. 1 ~ 10</Scope>
                </HomeworkCard>
            </HomeworkCards>
            <div>숙제</div>
            <Link href={'/review'}>복습하러 가기</Link>
        </StyledHomeworkList>
    );
};

const StyledHomeworkList = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
`;

const HomeworkListHeader = styled.div`
    padding: 1.2em 0.6em;
    font-weight: 600;
    font-size: 1.2em;
`;

const HomeworkTableTitle = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0.4em 0;
    background-color: #f5f4f4;
    text-align: center;
`;

const HomeworkCards = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`;

const HomeworkCard = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0.7em 0;
    text-align: center;
`;

const State = styled.button`
    width: 18%;

    &.homework-list__header {
        color: ${({ theme }) => theme.LIGHT_BLACK};
    }
`;

const Deadline = styled.span`
    width: 29%;

    &.homework-list__header {
        color: ${({ theme }) => theme.LIGHT_BLACK};
    }
`;

const Resource = styled.button`
    width: 29%;

    &.homework-list__header {
        color: ${({ theme }) => theme.LIGHT_BLACK};
    }
`;

const Scope = styled.span`
    width: 24%;

    &.homework-list__header {
        color: ${({ theme }) => theme.LIGHT_BLACK};
    }
`;

export default HomeworkList;
