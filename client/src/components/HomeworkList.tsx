import styled from 'styled-components';
import Link from 'next/link';
import { IHomeworkList, IHomeworkStatus } from '@/apis/homework/homework';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';

interface HomeworkListProps {
    homeworkList: IHomeworkList | undefined;
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

const HomeworkList = ({ homeworkList, handleClickHomeworkCard }: HomeworkListProps) => {
    const userSession = useRecoilValue(userSessionAtom);

    return (
        <StyledHomeworkList>
            <HomeworkTableTitle>
                <StateWrapper className="homework-list__header">구분</StateWrapper>
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
                                        <StateWrapper>
                                            <State status={homework.status}>
                                                {getStatusText(homework.status)}
                                            </State>
                                        </StateWrapper>
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
                                <StateWrapper>
                                    <State status={homework.status}>
                                        {getStatusText(homework.status)}
                                    </State>
                                </StateWrapper>
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
    align-items: center;
    justify-content: space-around;
    padding: 0.4em 0;
    background-color: #f5f4f4;
    text-align: center;
`;

const HomeworkCards = styled.div`
    width: 100%;
    min-width: 700px;
    height: 100%;
    overflow-y: scroll;
`;

const HomeworkCard = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.7em 0;
    text-align: center;
    border-radius: 0.3em;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
        transition: all 0.5s;
    }
`;

const StateWrapper = styled.button`
    width: 18%;

    &.homework-list__header {
        color: ${({ theme }) => theme.LIGHT_BLACK};
    }
`;

const State = styled.span<{ status?: IHomeworkStatus }>`
    padding: 6px 8px;
    border-radius: 1em;
    font-size: 14px;

    background-color: ${({ status, theme }) => {
        switch (status) {
            case 'COMPLETED':
                return theme.PRIMARY;
            case 'IN_PROGRESS':
                return theme.PRIMARY_LIGHT;
            default:
                return 'transparent'; // default background color
        }
    }};
    color: ${({ status }) =>
        status === 'COMPLETED' || status === 'IN_PROGRESS' ? 'white' : 'black'};
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
