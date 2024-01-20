import { useState } from 'react';
import { OnArgs } from 'react-calendar';

const useCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleClick = (date: Date): void => {
        setSelectedDate(date);
    };

    const handleYearMonthChange = ({ activeStartDate }: OnArgs) => {
        if (!activeStartDate) return;
        setSelectedDate(activeStartDate);
    };

    return { selectedDate, handleClick, handleYearMonthChange };
};

export default useCalendar;
