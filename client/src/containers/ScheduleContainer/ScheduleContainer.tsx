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

const testTutoringSchedules: ITutoringSchedules = [
    {
        scheduleDate: '2024-01-22',
        scheduleCount: 2,
        schedules: [
            {
                tutoringScheduleId: 1,
                tutoringId: 1,
                teacherMemberId: 1,
                subject: {
                    subjectId: 1,
                    name: '과목명1',
                },
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명1',
            },
            {
                tutoringScheduleId: 2,
                tutoringId: 2,
                teacherMemberId: 2,
                subject: {
                    subjectId: 2,
                    name: '과목명2',
                },
                startTime: '20:30',
                duration: 90,
                title: '커리큘럼명2',
            },
        ],
    },
    {
        scheduleDate: '2024-01-23',
        scheduleCount: 1,
        schedules: [
            {
                tutoringScheduleId: 3,
                tutoringId: 1,
                teacherMemberId: 1,
                subject: {
                    subjectId: 1,
                    name: '과목명1',
                },
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명3',
            },
        ],
    },
    {
        scheduleDate: '2024-01-28',
        scheduleCount: 1,
        schedules: [
            {
                tutoringScheduleId: 3,
                tutoringId: 1,
                teacherMemberId: 1,
                subject: {
                    subjectId: 1,
                    name: '과목명1',
                },
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명3',
            },
        ],
    },
    {
        scheduleDate: '2024-01-29',
        scheduleCount: 1,
        schedules: [
            {
                tutoringScheduleId: 3,
                tutoringId: 1,
                teacherMemberId: 1,
                subject: {
                    subjectId: 1,
                    name: '과목명1',
                },
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명3',
            },
        ],
    },
    {
        scheduleDate: '2024-01-30',
        scheduleCount: 1,
        schedules: [
            {
                tutoringScheduleId: 3,
                tutoringId: 1,
                teacherMemberId: 1,
                subject: {
                    subjectId: 1,
                    name: '과목명1',
                },
                startTime: '18:30',
                duration: 120,
                title: '커리큘럼명3',
            },
        ],
    },
];

const ScheduleContainer = ({ ...pageProps }: ScheduleContainerProps) => {
    const { userRole = 'teacher', tutoringSchedules, homeworkList } = pageProps;

    switch (userRole) {
        case 'teacher' || 'student':
            return (
                <HomeLayout>
                    <StyledScheduleContainer>
                        <ClassSchedule tutoringSchedules={testTutoringSchedules} />
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
