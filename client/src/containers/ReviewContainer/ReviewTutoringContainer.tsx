import { useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { ITutoringSubject } from '@/apis/tutoring/get-tutoring-video';
import HomeLayout from '@/components/layouts/HomeLayout';
import Pin from '@/components/icons/Pin';
import { timeStringToSeconds } from '@/utils/time';

interface MediaRecordProps {
    jumpToTime: number;
}

const MediaRecord = ({ jumpToTime }: MediaRecordProps) => {
    const recordVideoRef = useRef<HTMLVideoElement>(null);
    const [videoSource, setVideoSource] = useState<string>(
        'https://d1b632bso7m0wd.cloudfront.net/vod/N8ECzA9p4xSH/N8ECzA9p4xSH.m3u8'
    );

    useEffect(() => {
        if (recordVideoRef.current) {
            recordVideoRef.current.currentTime = jumpToTime;
        }
    }, [jumpToTime]);

    useEffect(() => {
        if (!recordVideoRef.current) return;
        recordVideoRef.current.src = 'https://dl6.webmfiles.org/elephants-dream.webm';
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
    tutoringSubjectList: ITutoringSubject[];
}

const ReviewTutoringContainer = ({ tutoringSubjectList }: ReviewTutoringContainerProps) => {
    const [jumpToTime, setJumpToTime] = useState<number>(0);

    return (
        <HomeLayout>
            <StyledReviewTutoringContainer>
                <MediaSection>
                    <MediaRecord jumpToTime={jumpToTime} />
                    <MediaInfo>
                        <Title>중등수학</Title>
                        <SubTitle>지수함수와 로그함수</SubTitle>
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
                        <TimestampCard>
                            <Time onClick={() => setJumpToTime(timeStringToSeconds('00:00:10'))}>
                                00:10:29
                            </Time>
                            <Content>
                                중요해요중요해요중요해요중요해요중요해요중요해요중요해요중요해요중요해요중요해요
                            </Content>
                        </TimestampCard>
                    </TimestampCards>
                </TimestampSection>
            </StyledReviewTutoringContainer>
        </HomeLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const videoId = context.params?.id as string;

    if (!videoId) return { props: {} };

    return {
        props: {},
    };
};

const StyledReviewTutoringContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
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

const TimestampSection = styled.div`
    flex: 1;
    height: 85%;
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

export default ReviewTutoringContainer;
