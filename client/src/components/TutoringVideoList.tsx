import Link from 'next/link';
import styled from 'styled-components';
import { IReviewVideo } from '@/apis/tutoring/get-tutoring-video';

interface TutoringVideoListProps {
    videoList: IReviewVideo[] | undefined;
}

const TutoringVideoList = ({ videoList }: TutoringVideoListProps) => {
    return (
        <StyledTutoringVideoList>
            <TutoringVideoTableTitle>
                <Deadline className="homework-list__header">과외 날짜</Deadline>
                <Resource className="homework-list__header">커리큘럼</Resource>
                <Scope className="homework-list__header">진행 시간</Scope>
            </TutoringVideoTableTitle>
            <TutoringVideoCards>
                {videoList && videoList.length > 0 ? (
                    videoList.map((videoInfo, index) => (
                        <Link
                            href={`review/${videoInfo.videoId}`}
                            target="_blank"
                            key={`review_${index}`}
                        >
                            <HomeworkCard>
                                <Scope>{videoInfo.scheduleDate} </Scope>
                                <Resource>{videoInfo.title}</Resource>
                                <Deadline>{videoInfo.duration}</Deadline>
                            </HomeworkCard>
                        </Link>
                    ))
                ) : (
                    <NoHomework>과외 녹화본이 없어요:)</NoHomework>
                )}
            </TutoringVideoCards>
        </StyledTutoringVideoList>
    );
};

const StyledTutoringVideoList = styled.div`
    width: 100%;
    height: 100%;
`;

const TutoringVideoTableTitle = styled.header`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.4em 0;
    background-color: #f5f4f4;
    text-align: center;
`;

const TutoringVideoCards = styled.div`
    width: 100%;
    min-width: 700px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

const Deadline = styled.span`
    width: 33%;

    &.homework-list__header {
        color: ${({ theme }) => theme.LIGHT_BLACK};
    }
`;

const Resource = styled.button`
    width: 33%;

    &.homework-list__header {
        color: ${({ theme }) => theme.LIGHT_BLACK};
    }
`;

const Scope = styled.span`
    width: 33%;

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

export default TutoringVideoList;
