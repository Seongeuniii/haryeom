import { getYearMonth } from '@/utils/time';
import { useState } from 'react';
import { OnArgs } from 'react-calendar';

const useCalendar = () => {
    const [date, setDate] = useState<Date>();
    const [yearMonth, setyearMonth] = useState<string>(getYearMonth(new Date()));

    const handleClickDay = (clickedDate: Date): void => {
        setDate(clickedDate);
    };

    const handleYearMonthChange = ({ activeStartDate }: OnArgs) => {
        if (!activeStartDate) return;
        console.log(activeStartDate);
        setyearMonth(getYearMonth(activeStartDate));
    };

    return { date, yearMonth, handleClickDay, handleYearMonthChange };
};

export default useCalendar;
