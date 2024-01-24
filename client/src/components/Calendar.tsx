import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

interface MyCalendarProps {
    selectedDate: Date;
    handleClickDay: (date: Date) => void;
    handleYearMonthChange: (onArgs: OnArgs) => void;
}

const MyCalendar = ({ selectedDate, handleClickDay, handleYearMonthChange }: MyCalendarProps) => {
    return (
        <CalendarContainer>
            <Calendar
                locale="en-US"
                value={selectedDate}
                onClickDay={handleClickDay}
                onActiveStartDateChange={handleYearMonthChange}
            ></Calendar>
        </CalendarContainer>
    );
};

const CalendarContainer = styled.div`
    .react-calendar {
        border: none;
        width: 100%;
        background-color: transparent;
    }

    .react-calendar__navigation {
        margin-bottom: 0;
        height: 18px;

        button {
            color: ${({ theme }) => theme.LIGHT_BLACK};
            font-size: 0.8em;
        }
    }

    .react-calendar abbr[title='Sunday'],
    .react-calendar abbr[title='Monday'],
    .react-calendar abbr[title='Tuesday'],
    .react-calendar abbr[title='Wednesday'],
    .react-calendar abbr[title='Thursday'],
    .react-calendar abbr[title='Friday'],
    .react-calendar abbr[title='Saturday'] {
        text-decoration: none;
        border-bottom: none;
        &:after {
            content: none;
        }
    }

    .react-calendar__tile--active,
    .react-calendar__tile--hasActive {
        background: ${({ theme }) => theme.PRIMARY_LIGHT} !important;
    }

    .react-calendar__month-view__days {
        button {
            border-radius: 100%;
        }
        .react-calendar__tile {
            height: 3.1em;
        }

        .react-calendar__tile--now {
            background: ${({ theme }) => theme.PRIMARY} !important;
        }

        .react-calendar__tile--now.react-calendar__tile--active {
            background: ${({ theme }) => theme.PRIMARY} !important;
        }
    }
`;

export default MyCalendar;
