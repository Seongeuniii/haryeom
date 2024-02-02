import styled from 'styled-components';
import Link from 'next/link';
import { IHomeworkList, IHomeworkStatus } from '@/apis/homework/homework';
import CreateNewHomework from './CreateNewHomework/CreateNewHomework';

interface HomeworkListProps {
    homeworkList: IHomeworkList | undefined;
}

const getStatusText = (status: IHomeworkStatus) => {
    switch (status) {
        case 'COMPLETED':
            return '제출완료';
        case 'IN_PROGRESS':
            return '진행중';
        case 'UNCONFIRMED':
            return '확인안함';
    }
};

const HomeworkList = ({ homeworkList }: HomeworkListProps) => {
    return (
        <StyledHomeworkList>
            <HomeworkListHeader>
                <span>숙제 목록</span>
                <CreateNewHomework />
            </HomeworkListHeader>
            <HomeworkTableTitle>
                <State className="homework-list__header">구분</State>
                <Deadline className="homework-list__header">마감일</Deadline>
                <Resource className="homework-list__header">학습자료</Resource>
                <Scope className="homework-list__header">범위</Scope>
            </HomeworkTableTitle>
            <HomeworkCards>
                {homeworkList ? (
                    homeworkList.map((homework, index) => (
                        <Link href={`homework/${homework.homeworkId}`} key={`homework_${index}`}>
                            <HomeworkCard>
                                <State status={homework.status}>
                                    {getStatusText(homework.status)}
                                </State>
                                <Deadline>{homework.deadline}</Deadline>
                                <Resource>{homework.textbookName}</Resource>
                                <Scope>{`p. ${homework.startPage} ~ ${homework.endPage}`}</Scope>
                            </HomeworkCard>
                        </Link>
                    ))
                ) : (
                    <Link href={`homework/1`}>
                        <HomeworkCard>
                            <State status={'IN_PROGRESS'}>{getStatusText('IN_PROGRESS')}</State>
                            <Deadline>{'2024. 02. 14'}</Deadline>
                            <Resource>{'수능특강 수학'}</Resource>
                            <Scope>{`p. 10 ~ 11`}</Scope>
                        </HomeworkCard>
                    </Link>
                )}
            </HomeworkCards>
        </StyledHomeworkList>
    );
};

const StyledHomeworkList = styled.div`
    width: 100%;
    min-height: 50%;
    display: flex;
    flex-direction: column;
    border-radius: 1em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    padding: 1.8em;
`;

const HomeworkListHeader = styled.div`
    width: 100%;
    padding: 0.3em 0.6em 1.2em 0.5em;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

const State = styled.button<{ status?: IHomeworkStatus }>`
    width: 18%;
    color: ${({ status, theme }) => {
        if (status === 'IN_PROGRESS') return theme.PRIMARY;
        else if (status === 'UNCONFIRMED') return '#ff4e4e';
    }};
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
