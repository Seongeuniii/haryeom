import { useEffect, useState } from 'react';

const useClassTimer = () => {
    const [timerId, setTimerId] = useState<NodeJS.Timeout | number>(0);
    const [progressTime, setProgressTime] = useState<number>(0);

    const startTimer = () => {
        const INTERVAL = 1000;
        const timerId = setInterval(() => {
            setProgressTime((prevTime) => prevTime + INTERVAL);
        }, 1000);
        setTimerId(timerId);
    };

    const stopTimer = () => {
        clearInterval(timerId);
    };

    useEffect(() => {
        return () => stopTimer();
    }, []);

    return { startTimer, stopTimer, progressTime };
};

const getHour = (ms: number) => {
    return String(Math.floor((ms / (1000 * 60 * 60)) % 24)).padStart(2, '0');
};

const getMinute = (ms: number) => {
    return String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, '0');
};

const getSecond = (ms: number) => {
    return String(Math.floor((ms / 1000) % 60)).padStart(2, '0');
};

export { useClassTimer, getHour, getMinute, getSecond };
