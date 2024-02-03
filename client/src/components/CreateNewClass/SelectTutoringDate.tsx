import styled from 'styled-components';
import MyCalendar from '../Calendar';
import useCalendar from '@/hooks/useCalendar';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { INewSchedule } from '@/apis/tutoring/tutoring';

interface SelectTutoringDateProps {
    updateSchedules: (date: Date) => void;
}

const SelectTutoringDate = ({ updateSchedules }: SelectTutoringDateProps) => {
    const { date, handleClickDay, handleYearMonthChange } = useCalendar();

    useEffect(() => {
        if (!date) return;
        updateSchedules(date);
    }, [date]);

    return (
        <StyledSelectTutoringDate>
            <CalendarWrapper>
                <MyCalendar
                    selectedDate={date}
                    handleClickDay={handleClickDay}
                    handleYearMonthChange={handleYearMonthChange}
                ></MyCalendar>
            </CalendarWrapper>
        </StyledSelectTutoringDate>
    );
};

const StyledSelectTutoringDate = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: scroll;
`;

const CalendarWrapper = styled.div`
    width: 300px;
`;

export default SelectTutoringDate;
