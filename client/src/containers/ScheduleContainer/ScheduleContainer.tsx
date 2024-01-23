import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';
import { IUserRole } from '@/apis/user/user';
import LoginContainer from '@/containers/LoginContainer';
import RegistUserInfoContainer from '@/containers/RegistUserInfoContainer';
import HomeLayout from '@/components/layouts/HomeLayout';
import ClassSchedule from '@/components/ClassSchedule';
import SelectedTSContainer from './SelectedTSContainer';

interface ScheduleContainerProps {
    userRole: IUserRole | undefined;
}

const ScheduleContainer = ({ userRole = 'teacher' }: ScheduleContainerProps) => {
    switch (userRole) {
        case 'teacher' || 'student':
            return (
                <HomeLayout>
                    <StyledScheduleContainer>
                        <ClassSchedule />
                        <SelectedTSContainer />
                    </StyledScheduleContainer>
                </HomeLayout>
            );
        case 'guest':
            return <RegistUserInfoContainer />;
        default:
            return <LoginContainer />; // NOT LOGIN
    }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    const userRole = getCookie('userRole', { req });

    if (!userRole || userRole === 'guest') return { props: {} };

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
