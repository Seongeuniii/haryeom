import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';

import HomeLayout from '@/components/layouts/HomeLayout';
import MyClassScheduleContainer from './MyClassScheduleContainer';
import SelectedTSContainer from './SelectedTSContainer';
import LoginContainer from '../LoginContainer';
import RegistUserInfoContainer from '../RegistUserInfoContainer';
import { IUserRole } from '@/apis/user/user';

interface ScheduleContainerProps {
    userRole: IUserRole | undefined;
}

// eslint-disable-next-line no-empty-pattern
const ScheduleContainer = ({ userRole }: ScheduleContainerProps) => {
    if (userRole === ('teacher' || 'student')) {
        return (
            <HomeLayout>
                <StyledScheduleContainer>
                    <MyClassScheduleContainer />
                    <SelectedTSContainer />
                </StyledScheduleContainer>
            </HomeLayout>
        );
    }
    if (!userRole) return <LoginContainer />;
    else if (userRole === 'guest') return <RegistUserInfoContainer />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    const userRole = getCookie('userRole', { req });

    if (!userRole || userRole === 'guest') return { props: {} }; // NOT LOGIN

    return { props: { userRole } };
};

const StyledScheduleContainer = styled.main`
    width: 90%;
    max-width: 1200px;
    height: calc(100% - 3.5em);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default ScheduleContainer;
