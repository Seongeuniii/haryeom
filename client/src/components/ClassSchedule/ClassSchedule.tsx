import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import MyCalendar from '@/components/Calendar';
import useCalendar from '@/hooks/useCalendar';
import { ITutoringSchedules } from '@/apis/tutoring/tutoring';
import { useRecoilValue } from 'recoil';
import userSessionAtom from '@/recoil/atoms/userSession';
import { getFormattedYearMonthDay } from '@/utils/time';
import { useGetTutoringSchedules } from '@/queries/useGetTutoringSchedules';
import ClassScheduleCard from '@/components/ClassScheduleCard';

interface ClassScheduleProps {
    tutoringSchedules: ITutoringSchedules;
    children?: ReactNode;
}

const ClassSchedule = ({ tutoringSchedules: _tutoringSchedules, children }: ClassScheduleProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return null;

    const { date, yearMonth, handleClickDay, handleYearMonthChange } = useCalendar();
    const { tutoringSchedulesOfMonth } = useGetTutoringSchedules(
        userSession.role,
        yearMonth,
        _tutoringSchedules
    );
    if (!tutoringSchedulesOfMonth) return '네트워크 에러';
    const [showMonth, setShowMonth] = useState<boolean>(false);

    return (
        <StyledClassSchedule>
            <ClassScheduleHeader>
                <Title>과외 일정</Title>
                <TodayScheduleButton onClick={() => setShowMonth(true)}>
                    이번 달 전체
                </TodayScheduleButton>
            </ClassScheduleHeader>
            <MyCalendar
                selectedDate={date}
                handleClickDay={handleClickDay}
                handleYearMonthChange={handleYearMonthChange}
                dotDates={Object.keys(tutoringSchedulesOfMonth).map((scheduleDate) => scheduleDate)}
            ></MyCalendar>
            <ScheduleList>
                {showMonth ? (
                    Object.entries(tutoringSchedulesOfMonth).map(
                        ([scheduleDate, classSchedulesOfDay], index) => (
                            <ClassScheduleCard
                                key={`daySchedule_${scheduleDate}_${index}`}
                                userRole={userSession.role}
                                scheduleDate={scheduleDate}
                                classSchedulesOfDay={classSchedulesOfDay}
                            />
                        )
                    )
                ) : (
                    <ClassScheduleCard
                        userRole={userSession.role}
                        scheduleDate={getFormattedYearMonthDay(date)}
                        classSchedulesOfDay={
                            tutoringSchedulesOfMonth[getFormattedYearMonthDay(date)]
                        }
                    />
                )}
            </ScheduleList>
            {children}
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

const TodayScheduleButton = styled.button`
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

export default ClassSchedule;
