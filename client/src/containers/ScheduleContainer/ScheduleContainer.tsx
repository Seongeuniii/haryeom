import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';
import { IUserRole } from '@/apis/user/user';
import LoginContainer from '@/containers/LoginContainer';
import RegistUserInfoContainer from '@/containers/RegistUserInfoContainer';
import HomeLayout from '@/components/layouts/HomeLayout';
import ClassSchedule from '@/components/ClassSchedule';
import SelectedTSContainer from './SelectedTSContainer';
import { getTutoringSchedules } from '@/apis/tutoring/get-tutoring-schedules';
import { ITutoringSchedules, ITutorings } from '@/apis/tutoring/tutoring';
import { getHomeworkList } from '@/apis/homework/get-homework-list';
import { IHomework } from '@/apis/homework/homework';
import { getYearMonth } from '@/utils/time';
import { getTutorings } from '@/apis/tutoring/get-tutorings';

interface ScheduleContainerProps {
    userRole: IUserRole;
    tutorings: ITutorings;
    tutoringSchedules: ITutoringSchedules;
    homeworkList: IHomework[];
}

const ScheduleContainer = ({ ...pageProps }: ScheduleContainerProps) => {
    const { userRole = 'teacher', tutoringSchedules, homeworkList } = pageProps;

    switch (userRole) {
        case 'teacher' || 'student':
            return (
                <HomeLayout>
                    <StyledScheduleContainer>
                        <ClassSchedule tutoringSchedules={tutoringSchedules} />
                        <SelectedTSContainer homeworkList={homeworkList} />
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

    let userRole: IUserRole | undefined;
    // userRole = getCookie('userRole', { req });

    if (!userRole || userRole === 'guest') {
        return { props: {} };
    }

    /**
     * tutorings: 과외목록
     * tutoringSchedules: 과외일정
     * homeworkList: 숙제목록
     * tutoringTextbooks: 학습자료
     */
    const tutorings = await getTutorings(userRole);
    const tutoringSchedules = await getTutoringSchedules(userRole, getYearMonth(new Date()));
    const homeworkList = await getHomeworkList(1); // tutoringId

    return { props: { userRole, tutorings, tutoringSchedules, homeworkList } };
};

const StyledScheduleContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default ScheduleContainer;
