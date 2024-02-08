import styled from 'styled-components';
import MyCalendar from '@/components/Calendar';
import useCalendar from '@/hooks/useCalendar';
import CreateNewClass from '@/components/CreateNewClass/CreateNewClass';
import { IStudentSchedule, ITeacherSchedule, ITutoringSchedules } from '@/apis/tutoring/tutoring';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { useEffect, useState } from 'react';
import TeacherScheduleCard from './TeacherScheduleCard';
import StudentScheduleCard from './StudentScheduleCard';
import { getFormattedYearMonthDay, getYearMonth } from '@/utils/time';
import { useGetTutoringSchedules } from '@/queries/useGetTutoringSchedules';

interface ClassScheduleProps {
    tutoringSchedules: ITutoringSchedules | undefined;
    CreateNewSchedule?: () => JSX.Element;
}

const ClassSchedule = ({
    tutoringSchedules: initialData,
    CreateNewSchedule,
}: ClassScheduleProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return null;

    const { date, setDate, yearMonth, handleClickDay, handleYearMonthChange } = useCalendar();
    const { data: tutoringSchedules, isLoading } = useGetTutoringSchedules(
        userSession.role,
        yearMonth,
        initialData
    );
    const [renderedTutoringSchedules, setRenderedTutoringSchedules] = useState<ITutoringSchedules>(
        tutoringSchedules || []
    );

    useEffect(() => {
        if (!tutoringSchedules) return;
        setRenderedTutoringSchedules(
            tutoringSchedules.filter(
                (schedule) => schedule.scheduleDate === getFormattedYearMonthDay(date)
            ) as ITutoringSchedules
        );
    }, [date]);

    useEffect(() => {
        setDate(new Date());
    }, []);

    useEffect(() => {
        console.log(renderedTutoringSchedules);
    }, [renderedTutoringSchedules]);

    return (
        <StyledClassSchedule>
            <ClassScheduleHeader>
                <Title>과외 일정</Title>
                <TodayScheduleButton>오늘</TodayScheduleButton>
            </ClassScheduleHeader>
            <MyCalendar
                selectedDate={date}
                handleClickDay={handleClickDay}
                handleYearMonthChange={handleYearMonthChange}
            ></MyCalendar>
            <ScheduleList>
                {renderedTutoringSchedules.length > 0 ? (
                    renderedTutoringSchedules.map((daySchedule, index) => (
                        <SchedulesOfADay key={index}>
                            <ScheduleDate>{daySchedule.scheduleDate}</ScheduleDate>
                            <ScheduleCards>
                                {daySchedule.schedules.map((schedule) => {
                                    return userSession?.role === 'TEACHER' ? (
                                        <TeacherScheduleCard
                                            key={schedule.tutoringId}
                                            schedule={schedule as ITeacherSchedule}
                                            scheduleDate={daySchedule.scheduleDate}
                                        />
                                    ) : (
                                        <StudentScheduleCard
                                            key={schedule.tutoringId}
                                            schedule={schedule as IStudentSchedule}
                                        />
                                    );
                                })}
                            </ScheduleCards>
                        </SchedulesOfADay>
                    ))
                ) : (
                    <NoSchedule>
                        <span>과외 일정 없음</span>
                    </NoSchedule>
                )}
            </ScheduleList>
            {CreateNewSchedule && <CreateNewSchedule />}
        </StyledClassSchedule>
    );
};

const StyledClassSchedule = styled.div`
    width: 30%;
    height: 93%;
    padding: 1.8em 1.8em 0 1.8em;
    border-radius: 1em;
    background-color: ${({ theme }) => theme.WHITE};
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    position: relative;
`;

const ClassScheduleHeader = styled.header`
    padding: 0.3em 0.6em 1.2em 0.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.DARK_BLACK};
`;

const Title = styled.span`
    font-size: 18px;
    font-weight: 600;
`;

const TodayScheduleButton = styled.span`
    font-size: 0.8em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    text-decoration: underline;
`;

const ScheduleList = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
    margin-top: 1em;
    padding-bottom: 3em;
    border-top: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

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

export default ClassSchedule;
