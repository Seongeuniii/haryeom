import styled from 'styled-components';

const ScheduleCard = () => {
    return (
        <StyledScheduleCard>
            <div>
                <ScheduledTime>
                    <StartTime>18:00</StartTime>
                    <Duration>~ 20:00</Duration>
                </ScheduledTime>
                <ClassInfo>
                    <Subject>고등수학</Subject>
                    <Curriculum>| 지수함수와 로그함수</Curriculum>
                </ClassInfo>
            </div>
            <ClassState>종료</ClassState>
        </StyledScheduleCard>
    );
};

const StyledScheduleCard = styled.div`
    width: 100%;
    padding: 0.8em;
    margin-bottom: 0.9em;
    border-radius: 0.8em;
    display: flex;
    align-items: center;
    font-size: 0.9em;
    border: 2px solid ${({ theme }) => theme.PRIMARY};
    background-color: ${({ theme }) => theme.SECONDARY};
`;

const ScheduledTime = styled.div`
    padding-left: 0.5em;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 0.9em;
`;

const StartTime = styled.div``;

const Duration = styled.div`
    margin-left: 4px;
`;

const ClassInfo = styled.div`
    display: flex;
    align-items: center;
`;

const Subject = styled.div`
    padding: 0.35em;
    font-size: 1.2em;
    font-weight: bold;
`;

const Curriculum = styled.div`
    margin-left: 0.2em;
`;

const ClassState = styled.div`
    margin-left: auto;
`;

export default ScheduleCard;
