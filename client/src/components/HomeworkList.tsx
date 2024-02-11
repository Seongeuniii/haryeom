import styled from 'styled-components';
import Link from 'next/link';
import { IHomeworkList, IHomeworkStatus } from '@/apis/homework/homework';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';

interface HomeworkListProps {
    homeworkList: IHomeworkList | undefined;
    CreateNewHomework?: () => JSX.Element;
    handleClickHomeworkCard?: (homeworkId: number) => void;
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

const HomeworkList = ({
    homeworkList,
    CreateNewHomework,
    handleClickHomeworkCard,
}: HomeworkListProps) => {
    const userSession = useRecoilValue(userSessionAtom);

    return (
        <StyledHomeworkList>
            <HomeworkTableTitle>
                <State className="homework-list__header">구분</State>
                <Deadline className="homework-list__header">마감일</Deadline>
                <Resource className="homework-list__header">학습자료</Resource>
                <Scope className="homework-list__header">범위</Scope>
            </HomeworkTableTitle>
            <HomeworkCards>
                {homeworkList && homeworkList.length > 0 ? (
                    homeworkList.map((homework, index) => {
                        if (userSession?.role === 'STUDENT') {
                            return (
                                <Link
                                    href={`homework/${homework.homeworkId}`}
                                    key={`homework_${index}`}
                                >
                                    <HomeworkCard>
                                        <State status={homework.status}>
                                            {getStatusText(homework.status)}
                                        </State>
                                        <Deadline>{homework.deadline}</Deadline>
                                        <Resource>{homework.textbookName}</Resource>
                                        <Scope>{`p. ${homework.startPage} ~ ${homework.endPage}`}</Scope>
                                    </HomeworkCard>
                                </Link>
                            );
                        }
                        return (
                            <HomeworkCard
                                key={`homework_${index}`}
                                onClick={
                                    handleClickHomeworkCard
                                        ? () => handleClickHomeworkCard(homework.homeworkId)
                                        : undefined
                                }
                            >
                                <State status={homework.status}>
                                    {getStatusText(homework.status)}
                                </State>
                                <Deadline>{homework.deadline}</Deadline>
                                <Resource>{homework.textbookName}</Resource>
                                <Scope>{`p. ${homework.startPage} ~ ${homework.endPage}`}</Scope>
                            </HomeworkCard>
                        );
                    })
                ) : (
                    <NoHomework>숙제가 없어요.</NoHomework>
                )}
            </HomeworkCards>
        </StyledHomeworkList>
    );
};

const StyledHomeworkList = styled.div`
    width: 100%;
    height: 100%;
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
    min-width: 700px;
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

const NoHomework = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default HomeworkList;
