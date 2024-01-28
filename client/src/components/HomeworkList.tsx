import styled from 'styled-components';
import { IHomeworkList } from '@/apis/homework/homework';
import Link from 'next/link';

interface HomeworkListProps {
    homeworkList: IHomeworkList;
}

const HomeworkList = ({ homeworkList }: HomeworkListProps) => {
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
                {homeworkList.map((homework, index) => (
                    <Link href={`homework/${homework.homeworkId}`} key={`homework_${index}`}>
                        <HomeworkCard>
                            <State>{homework.status}</State>
                            <Deadline>{homework.deadline}</Deadline>
                            <Resource>{homework.textbookName}</Resource>
                            <Scope>{`p. ${homework.startPage} ~ ${homework.endPage}`}</Scope>
                        </HomeworkCard>
                    </Link>
                ))}
            </HomeworkCards>
        </StyledHomeworkList>
    );
};

const StyledHomeworkList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 1em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 1.8em;
`;

const HomeworkListHeader = styled.div`
    padding: 0.3em 0.6em 1.2em 0.5em;
    font-weight: 600;
    font-size: 18px;
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
