import styled from 'styled-components';
import { IUserRole } from '@/apis/user/user';
import { IStudentSchedule, ITeacherSchedule, ITutoringSchedule } from '@/apis/tutoring/tutoring';
import TeacherScheduleCard from '@/components/ClassSchedule/TeacherScheduleCard';
import StudentScheduleCard from '@/components/ClassSchedule/StudentScheduleCard';

interface ClassScheduleCardProps {
    userRole: IUserRole;
    classSchedulesOfDay: ITutoringSchedule;
}
const ClassScheduleCard = ({ userRole, classSchedulesOfDay }: ClassScheduleCardProps) => {
    return (
        <SchedulesOfADay>
            <ScheduleDate>{classSchedulesOfDay.scheduleDate}</ScheduleDate>
            <ScheduleCards>
                {classSchedulesOfDay.schedules.map((schedule) => {
                    return userRole === 'TEACHER' ? (
                        <TeacherScheduleCard
                            key={`schedule_card_${schedule.tutoringScheduleId}`}
                            schedule={schedule as ITeacherSchedule}
                            scheduleDate={classSchedulesOfDay.scheduleDate}
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

export default ClassScheduleCard;
