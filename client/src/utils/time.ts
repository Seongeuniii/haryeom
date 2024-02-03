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

// 00:11:00 + 120 = 13:00
export const addMinutesToTime = (timeString: string, minutesToAdd: number): string => {
    const [hours, minutes] = timeString.split(':').map(Number);

    const newHours = (hours + Math.floor((minutes + minutesToAdd) / 60)) % 24;
    const newMinutes = (minutes + minutesToAdd) % 60;

    const formattedHours = newHours.toString().padStart(2, '0');
    const formattedMinutes = newMinutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
};

// 00:00:00 -> 00:00
export const getHourMin = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':').slice(1); // "18:00"에서 "18"과 "00"을 추출
    return `${hours}:${minutes}`;
};

// 요일
export const getDayOfWeek = (timeString: string) => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeekIndex = new Date(timeString).getDay();
    return daysOfWeek[dayOfWeekIndex];
};
