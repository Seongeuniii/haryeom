import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import HomeLayout from '@/components/layouts/HomeLayout';
import ClassSchedule from '@/components/ClassSchedule';
import {
    IStudentTutoring,
    ITeacherTutoring,
    ITeacherTutorings,
    ITutoringSchedules,
    ITutorings,
} from '@/apis/tutoring/tutoring';
import { getHomeworkList } from '@/apis/homework/get-homework-list';
import { IHomeworkList, IProgressPercentage } from '@/apis/homework/homework';
import HomeworkList from '@/components/HomeworkList';
import userSessionAtom from '@/recoil/atoms/userSession';
import { getTutorings } from '@/apis/tutoring/get-tutorings';
import { getTutoringSchedules } from '@/apis/tutoring/get-tutoring-schedules';
import { getYearMonth } from '@/utils/time';
import WithAuth from '@/hocs/withAuth';
import { IUserRole } from '@/apis/user/user';
import TutoringTeacherProfile from '@/components/TutoringTeacherProfile';
import TutoringStudentProfile from '@/components/TutoringStudentProfile';
import CreateNewClass from '@/components/CreateNewClass';
import { useEffect } from 'react';
import { getTextbooks } from '@/apis/tutoring/get-textbooks';

interface ScheduleContainerProps {
    tutorings: ITutorings;
    tutoringSchedules: ITutoringSchedules;
    homeworkList: IHomeworkList;
    progressPercentage: IProgressPercentage;
}

const ScheduleContainer = ({ ...pageProps }: ScheduleContainerProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;
    const { tutorings, tutoringSchedules, homeworkList, progressPercentage } = pageProps;

    console.log(tutorings, tutoringSchedules, homeworkList, progressPercentage);
    console.log(userSession);

    const getContents = async () => {
        if (!tutorings) return;
        const promises = tutorings.map((tutoring) => getTextbooks(tutoring.tutoringId));
        const textbooksArray = await Promise.all(promises);
        console.log(textbooksArray);
    };

    useEffect(() => {
        getContents();
    }, []);

    return (
        <HomeLayout>
            <StyledScheduleContainer>
                <ClassSchedule
                    tutoringSchedules={tutoringSchedules}
                    CreateNewSchedule={
                        userSession.role === 'TEACHER' && tutorings
                            ? () => CreateNewClass({ tutorings: tutorings as ITeacherTutorings })
                            : undefined
                    }
                />
                <SelectedTutoring>
                    {userSession.role === 'TEACHER' ? (
                        <TutoringStudentProfile tutoring={tutorings[0] as ITeacherTutoring} />
                    ) : (
                        <TutoringTeacherProfile tutoring={tutorings[0] as IStudentTutoring} />
                    )}
                    <HomeworkList homeworkList={homeworkList} />
                </SelectedTutoring>
            </StyledScheduleContainer>
        </HomeLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    const hasAuth = getCookie('accessToken', { req });
    if (!hasAuth) {
        return { props: {} };
    }

    const userRole = getCookie('userRole', { req }) as IUserRole;

    const tutorings = await getTutorings(userRole);
    const tutoringSchedules = await getTutoringSchedules(userRole, getYearMonth(new Date()));
    const homeworkListInfo =
        tutorings && tutorings.length > 0
            ? await getHomeworkList(tutorings[0].tutoringId)
            : undefined;

    return {
        props: {
            tutorings: tutorings || null,
            tutoringSchedules: tutoringSchedules || null,
            homeworkList: homeworkListInfo?.homeworkList || null,
            progressPercentage: homeworkListInfo?.progressPercentage || null,
        },
    };
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

export default WithAuth(ScheduleContainer);
