import styled from 'styled-components';
import MyCalendar from '@/components/Calendar';
import useCalendar from '@/hooks/useCalendar';
import ScheduleCard from '@/components/ScheduleCard';

const ClassScheduleContainer = () => {
    const { selectedDate, handleClick, handleYearMonthChange } = useCalendar();

    return (
        <StyledClassScheduleContainer>
            <ClassScheduleHeader>과외 일정</ClassScheduleHeader>
            <CalendarWrapper>
                <MyCalendar
                    selectedDate={selectedDate}
                    handleDayClick={handleClick}
                    handleYearMonthChange={handleYearMonthChange}
                ></MyCalendar>
            </CalendarWrapper>
            <ScheduleList>
                <SchedulesOfDay>
                    <ScheduleDate>1. 17. (월)</ScheduleDate>
                    <ScheduleCards>
                        <ScheduleCard />
                        <ScheduleCard />
                    </ScheduleCards>
                </SchedulesOfDay>
                <SchedulesOfDay>
                    <ScheduleDate>1. 17. (월)</ScheduleDate>
                    <ScheduleCards>
                        <ScheduleCard />
                        <ScheduleCard />
                    </ScheduleCards>
                </SchedulesOfDay>
            </ScheduleList>
        </StyledClassScheduleContainer>
    );
};

const StyledClassScheduleContainer = styled.div`
    height: 100%;
    padding: 1.2em;
    border: 3px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
    background-color: ${({ theme }) => theme.WHITE};
    display: flex;
    flex-direction: column;
`;

const ClassScheduleHeader = styled.header`
    font-weight: 600;
    font-size: 1.4em;
    color: ${({ theme }) => theme.DARK_BLACK};
    padding: 0.7em 0 0.5em 0.7em;
`;

const CalendarWrapper = styled.div`
    margin-bottom: 0.7em;
`;

const ScheduleList = styled.div`
    overflow: scroll;
`;

const SchedulesOfDay = styled.div``;

const ScheduleDate = styled.div`
    padding: 1.3em 0 1em 0;
    color: ${({ theme }) => theme.DARK_BLACK};
    font-size: 13px;
`;

const ScheduleCards = styled.div`
    padding-left: 0.7em;
    border-left: 3px solid ${({ theme }) => theme.PRIMARY};
`;

export default ClassScheduleContainer;
