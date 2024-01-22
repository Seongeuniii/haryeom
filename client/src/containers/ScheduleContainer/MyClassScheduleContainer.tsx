import styled from 'styled-components';
import MyCalendar from '@/components/Calendar';
import useCalendar from '@/hooks/useCalendar';
import ScheduleCard from '@/components/ScheduleCard';
import CreateNewClass from '@/components/CreateNewClass/CreateNewClass';

const MyClassScheduleContainer = () => {
    const { selectedDate, handleClick, handleYearMonthChange } = useCalendar();

    return (
        <StyledMyClassScheduleContainer>
            <ClassScheduleHeader>
                <Title>과외 일정</Title>
                <TodayScheduleButton>오늘</TodayScheduleButton>
            </ClassScheduleHeader>
            <MyCalendar
                selectedDate={selectedDate}
                handleDayClick={handleClick}
                handleYearMonthChange={handleYearMonthChange}
            ></MyCalendar>
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
                        <ScheduleCard />
                    </ScheduleCards>
                </SchedulesOfDay>
            </ScheduleList>
            <CreateNewClass />
        </StyledMyClassScheduleContainer>
    );
};

const StyledMyClassScheduleContainer = styled.div`
    width: 30%;
    height: 90%;
    padding: 1.8em;
    border-radius: 1em;
    background-color: ${({ theme }) => theme.WHITE};
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
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
    border-top: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const SchedulesOfDay = styled.div`
    margin: 1em 0;
`;

const ScheduleDate = styled.div`
    padding: 1em 0.5em 1em 0.5em;
    color: ${({ theme }) => theme.DARK_BLACK};
    font-size: 0.9em;
`;

const ScheduleCards = styled.div``;

export default MyClassScheduleContainer;
