import moment from 'moment';
import Calendar, { OnArgs } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

interface MyCalendarProps {
    selectedDate: Date | undefined;
    handleClickDay: (date: Date) => void;
    handleYearMonthChange: (onArgs: OnArgs) => void;
    dotDates?: string[];
}

const MyCalendar = ({
    selectedDate,
    handleClickDay,
    handleYearMonthChange,
    dotDates,
}: MyCalendarProps) => {
    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (!dotDates) return;
        if (view === 'month') {
            const dateString = moment(date).format('YYYY-MM-DD');
            if (dotDates.includes(dateString)) {
                return <StyledDot className="dot"></StyledDot>;
            }
        }
        return null;
    };

    return (
        <CalendarContainer>
            <Calendar
                locale="ko-KR"
                calendarType="US"
                formatDay={(locale, date) => moment(date).format('D')}
                value={selectedDate}
                onClickDay={handleClickDay}
                onActiveStartDateChange={handleYearMonthChange}
                tileContent={dotDates && tileContent}
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

    .react-calendar__month-view__weekdays abbr {
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

    .react-calendar__tile {
        position: relative;
    }
`;

const StyledDot = styled.div`
    position: absolute;
    background-color: ${({ theme }) => theme.PRIMARY};
    border-radius: 50%;
    width: 5px;
    height: 5px;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
`;

export default MyCalendar;
