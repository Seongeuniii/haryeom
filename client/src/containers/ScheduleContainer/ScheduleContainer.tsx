import styled from 'styled-components';
import MyClassScheduleContainer from './MyClassScheduleContainer';

import HomeLayout from '@/components/layouts/HomeLayout';
import SelectedTSContainer from './SelectedTSContainer';

interface ScheduleContainerProps {}

// eslint-disable-next-line no-empty-pattern
const ScheduleContainer = ({}: ScheduleContainerProps) => {
    return (
        <HomeLayout>
            <StyledScheduleContainer>
                <MyClassScheduleContainer />
                <SelectedTSContainer />
            </StyledScheduleContainer>
        </HomeLayout>
    );
};

export const getServerSideProps = () => {
    return { props: {} };
};

const StyledScheduleContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default ScheduleContainer;
