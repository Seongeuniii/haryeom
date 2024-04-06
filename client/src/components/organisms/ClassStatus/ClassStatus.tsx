import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ClassTimer from '@/components/ClassTimer';
import useClassTimer from '@/hooks/useClassTimer';
import userSessionAtom from '@/recoil/atoms/userSession';
import useMediaRecord from '@/hooks/useMediaRecord';
import { IUser } from '@/apis/user/user';
import { endTutoring, startTutoring } from '@/apis/tutoring/progress-tutoring';
import { saveTutoringvideo } from '@/apis/tutoring/save-tutoring-video';

interface ClassStatusProps {
    tutoringScheduleId: number;
    subject: string;
    title: string;
}

const ClassStatus = ({ tutoringScheduleId, subject, title }: ClassStatusProps) => {
    const userSession = useRecoilValue(userSessionAtom) as IUser;
    const router = useRouter();
    const { progressTime, classState, startClass, endClass } = useClassTimer();
    const { recordedChunks, prepareRecording, startRecording, stopRecording } = useMediaRecord();

    useEffect(() => {
        if (!recordedChunks) return;
        saveTutoringvideo(tutoringScheduleId, recordedChunks);
    }, [recordedChunks]);

    useEffect(() => {
        if (classState === '수업종료') {
            alert('수업이 종료되었어요:) 홈 화면으로 이동합니다.');
            router.push('/');
        }
    }, [classState]);

    const changeClassState = async () => {
        const handleClassStart = async () => {
            await prepareRecording();
            startRecording();
            await startTutoring(tutoringScheduleId);
        };
        const handleClassEnd = async () => {
            stopRecording();
            await endTutoring(tutoringScheduleId);
        };
        if (classState === '수업시작전') startClass(handleClassStart);
        else if (classState === '수업중') endClass(handleClassEnd);
    };

    return (
        <StyledClassStatus>
            <Section>
                <Logo>하렴</Logo>
                {classState === '수업중' && <RecordState>녹화중</RecordState>}
            </Section>
            <div>
                <Subject>{subject}</Subject>
                <Title>| {title}</Title>
            </div>
            <ClassTimer
                classState={classState}
                userRole={userSession.role}
                progressTime={progressTime}
                changeClassState={changeClassState}
            />
        </StyledClassStatus>
    );
};

const StyledClassStatus = styled.div`
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 2px solid ${({ theme }) => theme.PRIMARY};
    border-radius: 0.6em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const Section = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.span`
    font-weight: 700;
    font-size: 22px;
    color: ${({ theme }) => theme.PRIMARY};
`;

const RecordState = styled.div`
    background-color: #ff4e4e;
    padding: 5px;
    font-size: 12px;
    border-radius: 13px;
    color: white;
    animation: blink 2s infinite;

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
        100% {
            opacity: 1;
        }
    }
`;

const Subject = styled.div`
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 8px;
`;

const Title = styled.div`
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default ClassStatus;
