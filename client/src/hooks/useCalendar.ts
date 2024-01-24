import { getYearMonth } from '@/utils/time';
import { useState } from 'react';
import { OnArgs } from 'react-calendar';

const useCalendar = () => {
    const [day, setDay] = useState<Date>(new Date());
    const [yearMonth, setyearMonth] = useState<string>(getYearMonth(new Date()));

    const handleClickDay = (date: Date): void => {
        console.log('day');
        setDay(date);
    };

    const handleYearMonthChange = ({ activeStartDate }: OnArgs) => {
        if (!activeStartDate) return;
        console.log(activeStartDate);
        setyearMonth(getYearMonth(activeStartDate));
    };

    return { day, yearMonth, handleClickDay, handleYearMonthChange };
};

export default useCalendar;
