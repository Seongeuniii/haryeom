import styled from 'styled-components';
import Header from '@/components/Header';
import ClassScheduleContainer from './ClassScheduleContainer';

interface ScheduleContainerProps {}

// eslint-disable-next-line no-empty-pattern
const ScheduleContainer = ({}: ScheduleContainerProps) => {
    return (
        <StyledScheduleContainer>
            <Header navLinks={[]} />
            <UserScheduleSection>
                <MyScheduleSection>
                    <ClassScheduleContainer />
                </MyScheduleSection>
                <SelectedScheduleSection>
                    <div className="left">
                        <div>유저 선택</div>
                        <div>유저 정보 (진행률 or 사진)</div>
                        <div>커리큘럼</div>
                    </div>
                    <div className="right">
                        <div>학습자료</div>
                        <div>숙제목록</div>
                    </div>
                </SelectedScheduleSection>
            </UserScheduleSection>
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

const UserScheduleSection = styled.div`
    width: 90%;
    max-width: 1200px;
    height: calc(100% - 3.5em);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const MyScheduleSection = styled.div`
    width: 30%;
    height: 90%;
    border-radius: 1em;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

const SelectedScheduleSection = styled.div`
    width: 67%;
    height: 90%;
    background-color: ${({ theme }) => theme.WHITE};
    border-radius: 1em;
    display: flex;
    box-shadow: 0px 0px 20px rgba(105, 105, 105, 0.25);
`;

export default ScheduleContainer;
