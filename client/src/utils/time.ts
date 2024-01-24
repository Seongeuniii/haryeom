export const getYearMonth = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return year + month;
};

export const getFormattedYearMonthDay = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const addMinutesToTime = (startTime: string, minutesToAdd: number) => {
    const startDate = new Date(`2000-01-01T${startTime}:00`);
    const endTime = new Date(startDate.getTime() + minutesToAdd * 60000);

    const hours = endTime.getHours().toString().padStart(2, '0');
    const minutes = endTime.getMinutes().toString().padStart(2, '0');

    const formattedEndTime = `${hours}:${minutes}`;
    return formattedEndTime;
};
