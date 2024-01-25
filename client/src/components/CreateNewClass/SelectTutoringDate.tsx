import styled from 'styled-components';
import MyCalendar from '../Calendar';
import useCalendar from '@/hooks/useCalendar';

const SelectTutoringDate = () => {
    const { day, yearMonth, handleClickDay, handleYearMonthChange } = useCalendar();

    return (
        <StyledSelectTutoringDate>
            <CalendarWrapper>
                <MyCalendar
                    selectedDate={day}
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
