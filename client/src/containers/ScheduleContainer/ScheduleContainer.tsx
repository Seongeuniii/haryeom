import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import HomeLayout from '@/components/layouts/HomeLayout';
import ClassSchedule from '@/components/ClassSchedule';
import {
    IStudentTutoring,
    IStudentTutorings,
    ITeacherTutoring,
    ITeacherTutorings,
    ITutoringSchedules,
    ITutoringTextbook,
    ITutorings,
} from '@/apis/tutoring/tutoring';
import { getHomeworkList } from '@/apis/homework/get-homework-list';
import { IHomeworkList, IProgressPercentage } from '@/apis/homework/homework';
import HomeworkList from '@/components/HomeworkList';
import userSessionAtom from '@/recoil/atoms/userSession';
import { getTutoringSchedules } from '@/apis/tutoring/get-tutoring-schedules';
import { getYearMonth } from '@/utils/time';
import WithAuth from '@/hocs/withAuth';
import { IUserRole } from '@/apis/user/user';
import TutoringTeacherProfile from '@/components/TutoringTeacherProfile';
import TutoringStudentProfile from '@/components/TutoringStudentProfile';
import CreateNewClass from '@/components/CreateNewClass';
import { Dispatch, SetStateAction, useState } from 'react';
import { getTextbooks } from '@/apis/tutoring/get-textbooks';
import CreateNewHomework from '@/components/CreateNewHomework';
import { getTutorings } from '@/apis/tutoring/get-tutorings';
import { useGetHomeworkList } from '@/queries/useGetHomeworkList';

interface ScheduleContainerProps {
    tutorings: ITutorings;
    tutoringSchedules: ITutoringSchedules;
    homeworkList: IHomeworkList;
    progressPercentage: IProgressPercentage;
    tutoringTextbooks: ITutoringTextbook[];
}

const ScheduleContainer = ({ ...pageProps }: ScheduleContainerProps) => {
    const userSession = useRecoilValue(userSessionAtom);
    if (!userSession) return;

    const {
        tutorings = [],
        tutoringSchedules = [],
        homeworkList: initHomeworkList,
        progressPercentage: initProgressPercentage,
        tutoringTextbooks = [],
    } = pageProps;

    console.log(
        tutorings,
        tutoringSchedules,
        initHomeworkList,
        initProgressPercentage,
        tutoringTextbooks
    );
    console.log(userSession);

    const [seletedTutoring, setSelectedTutoring] = useState<ITeacherTutoring | IStudentTutoring>(
        tutorings[0]
    );
    const {
        data: { homeworkList, progressPercentage },
    } = useGetHomeworkList(seletedTutoring.tutoringId, {
        homeworkList: initHomeworkList,
        progressPercentage: initProgressPercentage,
    }) as {
        data: { homeworkList: IHomeworkList; progressPercentage: IProgressPercentage };
    };

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
                        <TutoringStudentProfile
                            seletedTutoring={seletedTutoring as ITeacherTutoring}
                            setSelectedTutoring={
                                setSelectedTutoring as Dispatch<SetStateAction<ITeacherTutoring>>
                            }
                            tutorings={tutorings as ITeacherTutorings}
                        />
                    ) : (
                        <TutoringTeacherProfile
                            seletedTutoring={seletedTutoring as IStudentTutoring}
                            setSelectedTutoring={
                                setSelectedTutoring as Dispatch<SetStateAction<IStudentTutoring>>
                            }
                            tutorings={tutorings as IStudentTutorings}
                        />
                    )}
                    <HomeworkList
                        homeworkList={homeworkList}
                        CreateNewHomework={
                            userSession.role === 'TEACHER' && tutorings
                                ? () =>
                                      CreateNewHomework({
                                          tutoringId: seletedTutoring.tutoringId,
                                          tutoringTextbooks,
                                      })
                                : undefined
                        }
                    />
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
    let homeworkListInfo;
    let tutoringTextbooks;
    if (tutorings && tutorings.length > 0) {
        homeworkListInfo = await getHomeworkList(tutorings[0].tutoringId);
        tutoringTextbooks = await getTextbooks(tutorings[0].tutoringId);
    }
    return {
        props: {
            tutorings: tutorings || null,
            tutoringSchedules: tutoringSchedules || null,
            homeworkList: homeworkListInfo?.homeworkList || null,
            progressPercentage: homeworkListInfo?.progressPercentage || null,
            tutoringTextbooks: tutoringTextbooks || null,
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
