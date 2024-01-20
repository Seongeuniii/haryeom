import styled from 'styled-components';
import Header from '@/components/Header';
import ClassScheduleContainer from './ClassScheduleContainer';

interface ScheduleContainerProps {}

// eslint-disable-next-line no-empty-pattern
const ScheduleContainer = ({}: ScheduleContainerProps) => {
    return (
        <StyledScheduleContainer>
            <Header navLinks={[]} />
            <UserScheduleWrapper>
                <LeftSection>
                    <ClassScheduleContainer></ClassScheduleContainer>
                </LeftSection>
                <RightSection></RightSection>
            </UserScheduleWrapper>
        </StyledScheduleContainer>
    );
};

export const getServerSideProps = () => {
    return { props: {} };
};

const StyledScheduleContainer = styled.main`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.BACKGROUND};
    display: flex;
    justify-content: center;
    align-items: end;
`;

const UserScheduleWrapper = styled.div`
    width: 90%;
    max-width: 1200px;
    height: calc(100% - 3.5em);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LeftSection = styled.div`
    width: 30%;
    height: 90%;
`;

const RightSection = styled.div`
    width: 67%;
    height: 90%;
    background-color: ${({ theme }) => theme.WHITE};
    border: 2px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 1em;
`;

export default ScheduleContainer;
