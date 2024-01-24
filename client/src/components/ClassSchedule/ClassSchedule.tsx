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
import { getFormattedYearMonthDay } from '@/utils/time';

interface ClassScheduleProps {
    tutoringSchedules: ITutoringSchedules;
}

/**
 * 날짜 클릭 -> 해당 날짜 -> 찾으면 객체 한개
 * 최초 로드 -> 해당 이후의 모든 날짜
 * useQuery => 전체 데이터
 * atom =>
 */

const userRole = 'teacher';

const ClassSchedule = ({ tutoringSchedules }: ClassScheduleProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    const { day, yearMonth, handleClickDay, handleYearMonthChange } = useCalendar();

    const [renderedTutoringSchedules, setRenderedTutoringSchedules] = useState<ITutoringSchedules>(
        []
    );

    useEffect(() => {
        setRenderedTutoringSchedules(
            tutoringSchedules.filter(
                (schedule) => schedule.scheduleDate === getFormattedYearMonthDay(day)
            ) as ITutoringSchedules
        );
    }, [day]);

    useEffect(() => {
        setRenderedTutoringSchedules(
            tutoringSchedules.filter(
                (schedule) => new Date(schedule.scheduleDate) >= new Date() // 시간 포함 (오늘 날짜 제외됨, TODO: 시간 추가)
            ) as ITutoringSchedules
        );
    }, [yearMonth]);

    return (
        <StyledClassSchedule>
            <ClassScheduleHeader>
                <Title>과외 일정</Title>
                <TodayScheduleButton>오늘</TodayScheduleButton>
            </ClassScheduleHeader>
            <MyCalendar
                selectedDate={day}
                handleClickDay={handleClickDay}
                handleYearMonthChange={handleYearMonthChange}
            ></MyCalendar>
            <ScheduleList>
                {renderedTutoringSchedules.map((daySchedule, index) => (
                    <SchedulesOfADay key={index}>
                        <ScheduleDate>{daySchedule.scheduleDate}</ScheduleDate>
                        <ScheduleCards>
                            {daySchedule.schedules.map((schedule) => {
                                return userRole === 'teacher' ? (
                                    <TeacherScheduleCard
                                        key={schedule.tutoringId}
                                        schedule={schedule as ITeacherSchedule}
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
                ))}
            </ScheduleList>
            <CreateNewClass />
        </StyledClassSchedule>
    );
};

const StyledClassSchedule = styled.div`
    width: 30%;
    height: 90%;
    padding: 1.8em 1.8em 0 1.8em;
    border-radius: 1em;
    background-color: ${({ theme }) => theme.WHITE};
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
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
    font-size: 1.2em;
    font-weight: 600;
`;

const TodayScheduleButton = styled.span`
    font-size: 0.8em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    text-decoration: underline;
`;

const ScheduleList = styled.div`
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

export default ClassSchedule;
