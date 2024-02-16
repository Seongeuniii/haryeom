import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { IStudentSchedule } from '@/apis/tutoring/tutoring';
import { addMinutesToTime, getHourMin } from '@/utils/time';
import { getClassRoomCode } from '@/apis/tutoring/get-class-room-code';
import chatSessionAtom from '@/recoil/atoms/chat';
import Chat from '@/components/icons/Chat';

interface StudentScheduleCardProps {
    schedule: IStudentSchedule;
}

const StudentScheduleCard = ({ schedule }: StudentScheduleCardProps) => {
    const router = useRouter();

    const joinClass = async () => {
        const data = await getClassRoomCode(schedule.tutoringScheduleId);
        router.push({
            pathname: `/class/${data?.roomCode}`,
            query: {
                title: schedule.title,
                subject: schedule.subject.name,
                time: `${getHourMin(schedule.startTime)} ~ ${addMinutesToTime(schedule.startTime, schedule.duration)}`,
                tutoringScheduleId: schedule.tutoringScheduleId,
                tutoringId: schedule.tutoringId,
            },
        });
    };

    const [chatSession, setChatSession] = useRecoilState(chatSessionAtom);

    const startChat = (open: boolean) => {
        setChatSession((prev) => {
            return { ...prev, openChat: open, chattingWithName: schedule.teacherName };
        });
    };

    return (
        <StyledStudentScheduleCard onClick={joinClass}>
            <ScheduleInfoSection>
                <ScheduledTime>
                    <StartTime>{getHourMin(schedule.startTime)}</StartTime>
                    <Duration>~ {addMinutesToTime(schedule.startTime, schedule.duration)}</Duration>
                </ScheduledTime>
                <ClassInfo>
                    <Subject>{schedule.subject.name}</Subject>
                    <Curriculum>| {schedule.title}</Curriculum>
                </ClassInfo>
            </ScheduleInfoSection>
            <TeacherInfoSection>
                <ProfileImage src={schedule.teacherProfileUrl} />
                <TeacherName>{schedule.teacherName} 선생님</TeacherName>
                <StartChattingButton
                    onClick={(e) => {
                        e.stopPropagation();
                        startChat(true);
                    }}
                >
                    <Chat backgroundColor="gray" />
                </StartChattingButton>
            </TeacherInfoSection>
        </StyledStudentScheduleCard>
    );
};

const StyledStudentScheduleCard = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 1.8em;
    border-radius: 0.8em;
    display: flex;
    flex-direction: column;
    font-size: 0.9em;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    background-color: ${({ theme }) => theme.SECONDARY};
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(0.985);
    }
`;

const ScheduleInfoSection = styled.section`
    padding: 0.8em;
`;

const TeacherInfoSection = styled.section`
    padding: 0.7em 1em;
    display: flex;
    align-items: center;
    gap: 1em;
    background-color: white;
`;

const ProfileImage = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.LIGHT_BLACK};
`;

const TeacherName = styled.div``;

const ScheduledTime = styled.div`
    padding-left: 0.5em;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 0.9em;
`;

const StartChattingButton = styled.button`
    width: 28px;
    height: 28px;
    padding-top: 3px;
    margin-left: auto;
    border: 1px solid #dcdcdc;
    border-radius: 100%;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

const StartTime = styled.div``;

const Duration = styled.div`
    margin-left: 4px;
`;

const ClassInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const Subject = styled.div`
    padding: 0.35em;
    font-size: 1.2em;
    font-weight: bold;
`;

const Curriculum = styled.div`
    padding: 0.35em;
`;

export default StudentScheduleCard;
