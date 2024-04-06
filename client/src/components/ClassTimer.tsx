import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getHour, getMinute, getSecond } from '@/utils/time';
import { IClassState } from '@/hooks/useClassTimer';
import { IUserRole } from '@/apis/user/user';

interface IClassTimer {
    userRole: IUserRole;
    classState: IClassState;
    progressTime: number;
    changeClassState: () => void;
}

const ClassTimer = ({ userRole, classState, progressTime, changeClassState }: IClassTimer) => {
    const [staticShow, setStaticShow] = useState<string>('수업 시작');
    const [hoverShow, setHoverShow] = useState<string>('수업 시작');
    const [isHover, setIsHover] = useState<boolean>(false);
    const handleMouseEnter = () => setIsHover(true);
    const handleMouseLeave = () => setIsHover(false);

    useEffect(() => {
        switch (classState) {
            case '수업중':
                setStaticShow('progressTime');
                setHoverShow('progressTime');
                setTimeout(() => {
                    setHoverShow('수업 종료하기');
                }, 2000);
                break;
            case '수업종료':
                setStaticShow('수업종료');
                setTimeout(() => {
                    setHoverShow('progressTime');
                }, 2000);
                break;
            default:
                break;
        }
    }, [classState]);

    if (userRole === 'STUDENT') {
        return (
            <StyledStudentClassTimer
                $classState={classState}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Clock>
                    {getHour(progressTime)}:{getMinute(progressTime)}:{getSecond(progressTime)}
                </Clock>
            </StyledStudentClassTimer>
        );
    }

    return (
        <StyledClassTimer
            $classState={classState}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Clock onClick={changeClassState}>
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

const StyledClassTimer = styled.div<{ $classState: IClassState }>`
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

const StyledStudentClassTimer = styled.div<{ $classState: IClassState }>`
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 0.3em;
    background-color: ${({ theme }) => theme.PRIMARY};
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

const Clock = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 9px;
`;

export default ClassTimer;
