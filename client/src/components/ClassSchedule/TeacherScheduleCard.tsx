import styled from 'styled-components';
import { useRouter } from 'next/router';
import UpdateSchedule from './UpdateSchedule';
import { addMinutesToTime, getHourMin } from '@/utils/time';
import { INewSchedule, ITeacherSchedule } from '@/apis/tutoring/tutoring';
import { getClassRoomCode } from '@/apis/tutoring/get-class-room-code';
import { deleteTutoringSchedule } from '@/apis/tutoring/delete-tutoring-schedule';
import Chat from '@/components/icons/Chat';
import Group from '@/components/icons/Group';
import Dropdown from '@/components/commons/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import { useModal } from '@/hooks/useModal';
import useChat from '@/hooks/useChat';

interface TeacherScheduleCardProps {
    schedule: ITeacherSchedule;
    scheduleDate: string;
}

const TeacherScheduleCard = ({ schedule, scheduleDate }: TeacherScheduleCardProps) => {
    const router = useRouter();
    const { openChatContainer } = useChat();
    const { open, openModal, closeModal } = useModal();

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

    const { open: isOpenDropdown, openDropdown, closeDropdown } = useDropdown();

    return (
        <>
            <UpdateSchedule
                tutoringScheduleId={schedule.tutoringScheduleId}
                scheduleInfo={scheduleInfo}
                open={open}
                closeModal={closeModal}
            />

            <StyledTeacherScheduleCard onClick={joinClass}>
                <ScheduleInfoSection>
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
                </ScheduleInfoSection>
                <StudentInfoSection>
                    <ProfileImage src={schedule.studentProfileUrl} alt="학생 프로필 사진" />
                    <StudentName>{schedule.studentName} 학생</StudentName>
                    <StartChattingButton
                        onClick={(e) => {
                            e.stopPropagation();
                            openChatContainer();
                        }}
                    >
                        <Chat backgroundColor="gray" />
                    </StartChattingButton>
                </StudentInfoSection>
                <Dropdown open={isOpenDropdown} closeDropdown={closeDropdown} top="40px" left="73%">
                    <EditScheduleBox>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeDropdown();
                                openModal();
                            }}
                        >
                            수정
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeDropdown();
                                deleteSchedule();
                            }}
                        >
                            삭제
                        </Button>
                    </EditScheduleBox>
                </Dropdown>
                <EditDropdownButton
                    onClick={
                        !isOpenDropdown
                            ? (e) => {
                                  e.stopPropagation();
                                  openDropdown();
                              }
                            : (e) => {
                                  e.stopPropagation();
                                  closeDropdown();
                              }
                    }
                >
                    <Group />
                </EditDropdownButton>
            </StyledTeacherScheduleCard>
        </>
    );
};

const StyledTeacherScheduleCard = styled.div`
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

const StudentInfoSection = styled.section`
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

const StudentName = styled.div``;

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

const ClassState = styled.div`
    margin-left: auto;
`;

const EditDropdownButton = styled.div`
    position: absolute;
    width: 23px;
    height: 23px;
    top: 10px;
    right: 10px;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const EditScheduleBox = styled.div`
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 0.3em;
    gap: 5px;
    padding: 0.4em 0.3em;
`;

const Button = styled.div`
    font-size: 12px;
    width: 100%;
    height: 30px;
    border-radius: 0.2em;
    padding-top: 7px;
    text-align: center;

    &:hover {
        /* background-color: ${({ theme }) => theme.PRIMARY_LIGHT}; */
        transition: all 0.5s;
    }
`;

export default TeacherScheduleCard;
