import { useState } from 'react';
import useTimer from '@/hooks/useTimer';

export type IClassState = '수업시작전' | '수업중' | '수업종료';

const useClassTimer = () => {
    const [classState, setClassState] = useState<IClassState>('수업시작전');
    const { progressTime, startTimer, stopTimer } = useTimer();

    const startClass = async (handleStartClass: () => Promise<void>): Promise<void> => {
        const isUserSelectDisplay = confirm('[필수] 녹화에 필요한 화면을 선택해주세요.');
        if (!isUserSelectDisplay) {
            alert('녹화 화면 선택 후 수업을 시작할 수 있어요:)');
            return;
        }
        await handleStartClass();
        alert('녹화가 시작되었어요.');
        startTimer();
        setClassState('수업중');
    };

    const endClass = async (handleClassEnd: () => Promise<void>): Promise<void> => {
        const isEndingClass = confirm('수업을 종료하시겠습니까?');
        if (!isEndingClass) {
            return;
        }
        await handleClassEnd();
        stopTimer();
        setClassState('수업종료');
    };

    return { progressTime, classState, startClass, endClass };
};

export default useClassTimer;
