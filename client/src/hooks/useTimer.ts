import { useEffect, useState } from 'react';

const useTimer = () => {
    const [progressTime, setProgressTime] = useState<number>(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | number>(0);

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

    return { progressTime, startTimer, stopTimer };
};

export default useTimer;
