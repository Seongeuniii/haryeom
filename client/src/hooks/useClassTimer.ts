import { useEffect, useState } from 'react';

export type ClassState = '수업시작전' | '수업중' | '수업종료';

interface IUseClassTimer {
    startClass: () => Promise<boolean>;
    endClass: () => Promise<boolean>;
}

const useClassTimer = ({ startClass, endClass }: IUseClassTimer) => {
    const [classState, setClassState] = useState<ClassState>('수업시작전');
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

    const changeClassState = async (state?: string) => {
        if (state === 'start') {
            startTimer();
            setClassState('수업중');
        } else if (state === 'stop') {
            stopTimer();
            setClassState('수업종료');
        }

        if (classState === '수업시작전') {
            const isStart = await startClass();
            if (!isStart) return;
            startTimer();
            setClassState('수업중');
        } else if (classState === '수업중') {
            const isEnd = await endClass();
            if (!isEnd) return;
            stopTimer();
            setClassState('수업종료');
        } else return;
    };

    useEffect(() => {
        return () => stopTimer();
    }, []);

    return { startTimer, stopTimer, progressTime, classState, changeClassState };
};

export default useClassTimer;

const getHour = (ms: number) => {
    return String(Math.floor((ms / (1000 * 60 * 60)) % 24)).padStart(2, '0');
};

const getMinute = (ms: number) => {
    return String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, '0');
};

const getSecond = (ms: number) => {
    return String(Math.floor((ms / 1000) % 60)).padStart(2, '0');
};

export { getHour, getMinute, getSecond };
