import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { IRecordedTutoringDetail, getTutoringVideo } from '@/apis/tutoring/get-tutoring-video';
import HomeLayout from '@/components/layouts/HomeLayout';
import Pin from '@/components/icons/Pin';
import { timeStringToSeconds } from '@/utils/time';

interface MediaRecordProps {
    videoSource: string;
    jumpToTime: number;
}

const MediaRecord = ({ videoSource, jumpToTime }: MediaRecordProps) => {
    const recordVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (recordVideoRef.current) {
            recordVideoRef.current.currentTime = jumpToTime;
        }
    }, [jumpToTime]);

    useEffect(() => {
        if (!recordVideoRef.current) return;
        recordVideoRef.current.src = videoSource;
    }, [videoSource]);

    return (
        <StyledMediaRecord>
            <video ref={recordVideoRef} autoPlay playsInline muted={true} controls />
        </StyledMediaRecord>
    );
};

export const StyledMediaRecord = styled.div`
    video {
        width: 100%;
        height: 100%;
        border-radius: 1em;
    }
`;

interface ReviewTutoringContainerProps {
    videoDetail: IRecordedTutoringDetail;
}

const ReviewTutoringContainer = ({ videoDetail }: ReviewTutoringContainerProps) => {
    const [jumpToTime, setJumpToTime] = useState<number>(0);

    return (
        <HomeLayout>
            <StyledReviewTutoringContainer>
                <MediaSection>
                    <MediaRecord videoSource={videoDetail.videoUrl} jumpToTime={jumpToTime} />
                    <MediaInfo>
                        <Title>
                            {videoDetail.subjectName} - {videoDetail.scheduleDate}
                        </Title>
                        <SubTitle>{videoDetail.title}</SubTitle>
                        <TeacherInfoSection>
                            <TeacherProfileImg src={videoDetail.teacherProfileUrl} />
                            <TeacherName>{videoDetail.teacherName} 선생님</TeacherName>
                        </TeacherInfoSection>
                    </MediaInfo>
                </MediaSection>
                <TimestampSection>
                    <TimestampHeader>
                        <Icon>
                            <Pin />
                        </Icon>
                        <span>타임스탬프</span>
                    </TimestampHeader>
                    <TimestampCards>
                        {videoDetail.videoTimestampList.length > 0 ? (
                            <>
                                {videoDetail.videoTimestampList?.map((videoTimestamp) => {
                                    return (
                                        <TimestampCard
                                            key={`video_timestamp_${videoTimestamp.timestampId}`}
                                        >
                                            <Time
                                                onClick={() =>
                                                    setJumpToTime(
                                                        timeStringToSeconds(
                                                            videoTimestamp.stampTime
                                                        )
                                                    )
                                                }
                                            >
                                                {videoTimestamp.stampTime}
                                            </Time>
                                            <Content>{videoTimestamp.content}</Content>
                                        </TimestampCard>
                                    );
                                })}
                            </>
                        ) : (
                            <NoTimestamp>타임스탬프 기록이 없어요.</NoTimestamp>
                        )}
                    </TimestampCards>
                </TimestampSection>
            </StyledReviewTutoringContainer>
        </HomeLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const videoId = parseInt(context.params?.id as string);

    if (!videoId) return { props: {} };

    const videoDetail = await getTutoringVideo(videoId);

    return { props: { videoDetail } };
};

const StyledReviewTutoringContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MediaSection = styled.div`
    width: 850px;
    height: 100%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const MediaInfo = styled.header`
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: column;
`;

const Title = styled.span`
    margin-bottom: 0.5em;
    font-size: 1.5em;
    font-weight: bold;
`;

const SubTitle = styled.span`
    font-size: 0.8em;
    padding-left: 0.1em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const TeacherInfoSection = styled.div`
    min-width: calc(50% - 6px);
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
`;

const TeacherProfileImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 35px;
    object-fit: cover;
`;

const TeacherName = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    padding: 0.5em;
`;

const TimestampSection = styled.div`
    flex: 1;
    height: 70%;
    padding-left: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TimestampHeader = styled.header`
    display: flex;
    align-items: center;
    padding: 1em 0;
    font-size: 18px;
    font-weight: 699;
`;

const Icon = styled.div`
    width: 30px;
    height: 20px;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const TimestampCards = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: start;
    overflow: scroll;
`;

const TimestampCard = styled.div`
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 0.8em;
    font-size: 14px;
`;

const Time = styled.button`
    padding: 4px 8px;
    border-radius: 0.9em;
    font-weight: 500;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
`;

const Content = styled.span`
    padding: 0 2px;
`;

const NoTimestamp = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default ReviewTutoringContainer;
