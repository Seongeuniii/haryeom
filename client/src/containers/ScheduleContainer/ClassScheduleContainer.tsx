import styled from 'styled-components';
import MyCalendar from '@/components/Calendar';
import useCalendar from '@/hooks/useCalendar';
import ScheduleCard from '@/components/ScheduleCard';

const ClassScheduleContainer = () => {
    const { selectedDate, handleClick, handleYearMonthChange } = useCalendar();

    return (
        <StyledClassScheduleContainer>
            <CalendarWrapper>
                <MyCalendar
                    selectedDate={selectedDate}
                    handleDayClick={handleClick}
                    handleYearMonthChange={handleYearMonthChange}
                ></MyCalendar>
            </CalendarWrapper>
            <ClassScheduleHeader>
                <Title>과외 일정</Title>
                <ViewDate>오늘일정</ViewDate>
            </ClassScheduleHeader>
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
    border-radius: 1em;
    background-color: ${({ theme }) => theme.WHITE};
    display: flex;
    flex-direction: column;
`;

const CalendarWrapper = styled.div`
    padding-bottom: 1em;
    border-bottom: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const ClassScheduleHeader = styled.header`
    color: ${({ theme }) => theme.DARK_BLACK};
    padding: 1.5em 0.6em 0 0.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.span`
    font-weight: 600;
    font-size: 1.1em;
`;

const ViewDate = styled.span`
    font-size: 0.8em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    text-decoration: underline;
`;

const ScheduleList = styled.div`
    overflow: scroll;
    padding: 0.5em;
`;

const SchedulesOfDay = styled.div``;

const ScheduleDate = styled.div`
    padding: 1em 0 1em 0;
    color: ${({ theme }) => theme.DARK_BLACK};
    font-size: 13px;
`;

const ScheduleCards = styled.div`
    padding-left: 0.7em;
    border-left: 3px solid ${({ theme }) => theme.PRIMARY};
`;

export default ClassScheduleContainer;
