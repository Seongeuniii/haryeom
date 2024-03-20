import styled from 'styled-components';
import { IUserRole } from '@/apis/user/user';
import { IStudentSchedule, ITeacherSchedule } from '@/apis/tutoring/tutoring';
import TeacherScheduleCard from '@/components/ClassSchedule/TeacherScheduleCard';
import StudentScheduleCard from '@/components/ClassSchedule/StudentScheduleCard';

interface ClassScheduleCardProps {
    userRole: IUserRole;
    scheduleDate: string;
    classSchedulesOfDay: ITeacherSchedule[] | IStudentSchedule[] | undefined;
}
const ClassScheduleCard = ({
    userRole,
    scheduleDate,
    classSchedulesOfDay,
}: ClassScheduleCardProps) => {
    if (!classSchedulesOfDay)
        return (
            <NoSchedule>
                <span>과외 일정 없음</span>
            </NoSchedule>
        );

    return (
        <SchedulesOfADay>
            <ScheduleDate>{scheduleDate}</ScheduleDate>
            <ScheduleCards>
                {classSchedulesOfDay.map((schedule) => {
                    return userRole === 'TEACHER' ? (
                        <TeacherScheduleCard
                            key={`schedule_card_${schedule.tutoringScheduleId}`}
                            schedule={schedule as ITeacherSchedule}
                            scheduleDate={scheduleDate}
                        />
                    ) : (
                        <StudentScheduleCard
                            key={`schedule_card${schedule.tutoringScheduleId}`}
                            schedule={schedule as IStudentSchedule}
                        />
                    );
                })}
            </ScheduleCards>
        </SchedulesOfADay>
    );
};

const SchedulesOfADay = styled.div`
    margin: 1em 0;
`;

const ScheduleDate = styled.div`
    padding: 1em 0.5em 1em 0.5em;
    color: ${({ theme }) => theme.DARK_BLACK};
    font-size: 0.9em;
`;

const ScheduleCards = styled.div``;

const NoSchedule = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default ClassScheduleCard;
