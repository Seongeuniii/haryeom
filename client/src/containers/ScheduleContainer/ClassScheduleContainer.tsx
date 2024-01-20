import styled from 'styled-components';
import MyCalendar from '@/components/Calendar';
import useCalendar from '@/hooks/useCalendar';

const ClassScheduleContainer = () => {
    const { selectedDate, handleClick, handleYearMonthChange } = useCalendar();

    return (
        <CalendarWrapper>
            <MyCalendar
                selectedDate={selectedDate}
                handleDayClick={handleClick}
                handleYearMonthChange={handleYearMonthChange}
            ></MyCalendar>
        </CalendarWrapper>
    );
};

const CalendarWrapper = styled.div``;

export default ClassScheduleContainer;
