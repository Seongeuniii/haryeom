import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';

import HomeLayout from '@/components/layouts/HomeLayout';
import LoginContainer from '@/containers/LoginContainer';
import RegistUserInfoContainer from '@/containers/RegistUserInfoContainer';
import ClassSchedule from '@/components/ClassSchedule';
import { getTutoringSchedules } from '@/apis/tutoring/get-tutoring-schedules';
import { ITutoringSchedules, ITutorings } from '@/apis/tutoring/tutoring';
import { getHomeworkList } from '@/apis/homework/get-homework-list';
import { IHomework, IHomeworkList, IProgressPercentage } from '@/apis/homework/homework';
import { getTutorings } from '@/apis/tutoring/get-tutorings';
import { IUserRole } from '@/apis/user/user';
import { getYearMonth } from '@/utils/time';
import TutoringStudentProfile from '@/components/TutoringStudentProfile';
import HomeworkList from '@/components/HomeworkList';

interface ScheduleContainerProps {
    userRole: IUserRole;
    tutorings: ITutorings;
    tutoringSchedules: ITutoringSchedules;
    homeworkList: IHomeworkList;
    progressPercentage: IProgressPercentage;
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

const dummyHomeworks: IHomeworkList = [
    {
        homeworkId: 2,
        textbookId: 2,
        textbookName: 'Resource 2',
        startPage: 10,
        endPage: 20,
        status: 'UNCONFIRMED',
        deadline: '2023-12-31',
    },
    {
        homeworkId: 1,
        textbookId: 1,
        textbookName: 'Resource 1',
        startPage: 10,
        endPage: 20,
        status: 'UNCONFIRMED',
        deadline: '2023-12-31',
    },
];

const ScheduleContainer = ({ ...pageProps }: ScheduleContainerProps) => {
    const { userRole = 'TEACHER', tutoringSchedules, homeworkList } = pageProps;
    if (userRole === 'GUEST') return <RegistUserInfoContainer />;
    if (!userRole) return <LoginContainer />; // NOT LOGIN

    return (
        <HomeLayout>
            <StyledScheduleContainer>
                <ClassSchedule tutoringSchedules={testTutoringSchedules} />
                <SelectedTutoring>
                    <TutoringStudentProfile />
                    <HomeworkList homeworkList={dummyHomeworks} />
                </SelectedTutoring>
            </StyledScheduleContainer>
        </HomeLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    let userRole: IUserRole | undefined;
    // userRole = getCookie('userRole', { req });

    if (!userRole || userRole === 'GUEST') {
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
    const homeworkListInfo = await getHomeworkList(1); // tutoringId
    const homeworkList = homeworkListInfo?.homeworkList;
    const progressPercentage = homeworkListInfo?.progressPercentage;

    return { props: { userRole, tutorings, tutoringSchedules, homeworkList, progressPercentage } };
};

const StyledScheduleContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SelectedTutoring = styled.main`
    width: 67%;
    height: 93%;
    display: flex;
    flex-direction: column;
`;

export default ScheduleContainer;
