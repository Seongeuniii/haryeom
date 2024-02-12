import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useClassTimer, getHour, getMinute, getSecond } from '../hooks/useClassTimer';

type ClassState = '수업시작전' | '수업중' | '수업종료';

interface ClassTimerProps {
    startClass: () => Promise<boolean>;
    endClass: () => Promise<boolean>;
}

const ClassTimer = ({ startClass, endClass }: ClassTimerProps) => {
    const [classState, setClassState] = useState<ClassState>('수업시작전');
    const { startTimer, stopTimer, progressTime } = useClassTimer();
    const [staticShow, setStaticShow] = useState<string>('수업 시작');
    const [hoverShow, setHoverShow] = useState<string>('수업 시작');
    const [isHover, setIsHover] = useState<boolean>(false);

    const changeClassState = async () => {
        if (classState === '수업시작전') {
            const isStart = await startClass();
            if (!isStart) return;
            startTimer();
            setStaticShow('progressTime');
            setHoverShow('progressTime');
            setTimeout(() => {
                setHoverShow('수업 종료하기');
            }, 2000);
            setClassState('수업중');
        } else if (classState === '수업중') {
            const isEnd = await endClass();
            if (!isEnd) return;
            stopTimer();
            setStaticShow('수업종료');
            setTimeout(() => {
                setHoverShow('progressTime');
            }, 2000);
            setClassState('수업종료');
        } else return;
    };

    const handleMouseEnter = (e: MouseEvent) => {
        setIsHover(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
        setIsHover(false);
    };

    return (
        <StyledClassTimer
            $classState={classState}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Clock onClick={changeClassState}>
                {/* {showTime ? (
                    <>
                        {getHour(progressTime)}:{getMinute(progressTime)}:{getSecond(progressTime)}
                    </>
                ) : (
                    <>{classState === '수업시작전' ? '수업시작' : '수업종료'}</>
                )} */}

                {isHover ? (
                    <>
                        {hoverShow === 'progressTime' ? (
                            <>
                                {getHour(progressTime)}:{getMinute(progressTime)}:
                                {getSecond(progressTime)}
                            </>
                        ) : (
                            <>{hoverShow}</>
                        )}
                    </>
                ) : (
                    <>
                        {staticShow === 'progressTime' ? (
                            <>
                                {getHour(progressTime)}:{getMinute(progressTime)}:
                                {getSecond(progressTime)}
                            </>
                        ) : (
                            <>{staticShow}</>
                        )}
                    </>
                )}
            </Clock>
        </StyledClassTimer>
    );
};

const StyledClassTimer = styled.div<{ $classState: ClassState }>`
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 0.3em;
    background-color: ${({ theme, $classState }) =>
        $classState === '수업시작전' ? theme.PRIMARY_LIGHT : theme.PRIMARY};
    color: white;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
    }
`;

const Clock = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 9px;
`;

export default ClassTimer;
