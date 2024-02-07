import styled from 'styled-components';
import { INewSchedule, ITeacherSchedule } from '@/apis/tutoring/tutoring';
import { addMinutesToTime, getHourMin } from '@/utils/time';
import { useRouter } from 'next/router';
import { getClassRoomCode } from '@/apis/tutoring/get-class-room-code';
import { deleteTutoringSchedule } from '@/apis/tutoring/delete-tutoring-schedule';
import Button from '../commons/Button';
import UpdateSchedule from './UpdateSchedule';
import { useModal } from '@/hooks/useModal';

interface TeacherScheduleCardProps {
    schedule: ITeacherSchedule;
    scheduleDate: string;
}

const TeacherScheduleCard = ({ schedule, scheduleDate }: TeacherScheduleCardProps) => {
    const router = useRouter();
    const { open, openModal, closeModal } = useModal();

    const joinClass = async () => {
        const data = await getClassRoomCode(schedule.tutoringScheduleId);
        router.push({
            pathname: `/class/${data?.roomCode}`,
            query: {
                title: schedule.title,
                subject: schedule.subject.name,
                time: `${getHourMin(schedule.startTime)} ~ ${addMinutesToTime(schedule.startTime, schedule.duration)}`,
            },
        });
    };

    const scheduleInfo: INewSchedule = {
        scheduleDate,
        startTime: schedule.startTime,
        duration: schedule.duration,
        title: schedule.title,
    };

    const deleteSchedule = async () => {
        if (confirm('해당 일정을 삭제하시겠습니까?')) {
            await deleteTutoringSchedule(schedule.tutoringScheduleId);
            router.reload();
        }
    };

    return (
        <CardWrapper>
            <StyledTeacherScheduleCard onClick={joinClass}>
                <div>
                    <ScheduledTime>
                        <StartTime>{getHourMin(schedule.startTime)}</StartTime>
                        <Duration>
                            ~ {addMinutesToTime(schedule.startTime, schedule.duration)}
                        </Duration>
                    </ScheduledTime>
                    <ClassInfo>
                        <Subject>{schedule.subject.name}</Subject>
                        <Curriculum>| {schedule.title}</Curriculum>
                    </ClassInfo>
                </div>
                {/* <ClassState>종료</ClassState> */}
            </StyledTeacherScheduleCard>
            <Button content="수정" onClick={openModal} width="10%"></Button>
            <Button content="삭제" onClick={deleteSchedule} width="10%"></Button>

            {open && (
                <UpdateSchedule
                    tutoringScheduleId={schedule.tutoringScheduleId}
                    scheduleInfo={scheduleInfo}
                    open={open}
                    closeModal={closeModal}
                />
            )}
        </CardWrapper>
    );
};

const CardWrapper = styled.div`
    width: 100%;
    padding: 0.8em;
    margin-bottom: 0.9em;
    border-radius: 0.8em;
    display: flex;
    align-items: center;
    font-size: 0.9em;
`;

const StyledTeacherScheduleCard = styled.div`
    width: 100%;
    padding: 0.8em;
    margin-bottom: 0.9em;
    border-radius: 0.8em;
    display: flex;
    align-items: center;
    font-size: 0.9em;
    border: 2px solid ${({ theme }) => theme.PRIMARY};
    background-color: ${({ theme }) => theme.SECONDARY};
`;

const ScheduledTime = styled.div`
    padding-left: 0.5em;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 0.9em;
`;

const StartTime = styled.div``;

const Duration = styled.div`
    margin-left: 4px;
`;

const ClassInfo = styled.div`
    display: flex;
    align-items: center;
`;

const Subject = styled.div`
    padding: 0.35em;
    font-size: 1.2em;
    font-weight: bold;
`;

const Curriculum = styled.div`
    margin-left: 0.2em;
`;

const ClassState = styled.div`
    margin-left: auto;
`;

export default TeacherScheduleCard;
