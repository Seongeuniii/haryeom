import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { ParsedUrlQuery } from 'querystring';
import userSessionAtom from '@/recoil/atoms/userSession';
import useStream from '@/hooks/useStream';
import useWebRTC from '@/hooks/useWebRTC';
import Timestamp from '@/components/Timestamp';
import MediaStreamList from '@/organisms/MediaStreamList';
import ClassStatus from '@/organisms/ClassStatus';
import TeachingTools from '@/organisms/TeachingTools';

const ClassContainer = () => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return null;
    const router = useRouter();
    const { classId, tutoringId, tutoringScheduleId, subject, title } = parseQuery(router.query);

    const { myStream, stopStream } = useStream();
    const { stompClient, peerStream, dataChannels } = useWebRTC({
        memberId: userSession.memberId,
        roomCode: classId,
        myStream,
    });

    useEffect(() => {
        const handleRouteChange = () => stopStream();
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
            stompClient?.disconnect();
        };
    }, [router, stopStream, stompClient]);

    return (
        <StyledClassContainer>
            <LeftSection>
                <ClassStatus
                    tutoringScheduleId={tutoringScheduleId}
                    subject={subject}
                    title={title}
                />
                <MediaStreamList myStream={myStream} peerStream={peerStream} />
                <Timestamp progressTime={0} /> {/* TODO : 얘 어뜨케 */}
            </LeftSection>
            <TeachingTools
                isTeacher={userSession.role === 'TEACHER'}
                tutoringScheduleId={tutoringScheduleId}
                dataChannels={dataChannels}
                tutoringId={tutoringId}
            />
        </StyledClassContainer>
    );
};

const StyledClassContainer = styled.main`
    width: 100vw;
    height: 100vh;
    padding: 0 7%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        & {
            width: 100%;
        }
    }
`;

const LeftSection = styled.div`
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 1100px) {
        & {
            display: none;
        }
    }
`;

const parseQuery = (query: ParsedUrlQuery) => {
    const { id, tutoringId, tutoringScheduleId, subject, title } = query;
    return {
        classId: id as string,
        tutoringId: parseInt(tutoringId as string),
        tutoringScheduleId: parseInt(tutoringScheduleId as string),
        subject: subject as string,
        title: title as string,
    };
};

export default ClassContainer;
