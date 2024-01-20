import styled from 'styled-components';
import Features from './icons/Features';

const ScheduleCard = () => {
    return (
        <StyledScheduleCard>
            <ScheduledTime>
                <StartTime>18:00</StartTime>
                <Duration>2h</Duration>
            </ScheduledTime>
            <ClassInfo>
                <Subject>수학</Subject>
                <Curriculum>지수함수와 로그함수</Curriculum>
            </ClassInfo>
            <ClassState>종료</ClassState>
        </StyledScheduleCard>
    );
};

const StyledScheduleCard = styled.div`
    width: 100%;
    height: 60px;
    padding: 0.8em;
    margin-bottom: 13px;
    border-radius: 0.9em;
    gap: 1em;
    font-size: 12px;
    background-color: ${({ theme }) => theme.whte};
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    display: flex;
    align-items: center;
`;

const ScheduledTime = styled.div`
    color: ${({ theme }) => theme.LIGHT_BLACK};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2em;
`;

const StartTime = styled.div``;

const Duration = styled.div``;

const ClassInfo = styled.div`
    display: flex;
    align-items: center;
`;

const Subject = styled.div`
    padding: 0.5em;
    border-radius: 0.9em;
    background-color: ${({ theme }) => theme.SECONDARY};
    color: ${({ theme }) => theme.DARK_BLACK};
    font-size: 14px;
`;

const Curriculum = styled.div`
    max-width: 13em;
    margin-left: 0.7em;
`;

const ClassState = styled.div`
    margin-left: auto;
`;

export default ScheduleCard;
