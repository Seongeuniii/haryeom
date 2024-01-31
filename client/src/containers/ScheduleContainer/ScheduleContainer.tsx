import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import HomeLayout from '@/components/layouts/HomeLayout';
import RegistUserInfoContainer from '@/containers/RegistUserInfoContainer';
import ClassSchedule from '@/components/ClassSchedule';
import { ITutoringSchedules, ITutorings } from '@/apis/tutoring/tutoring';
import { getHomeworkList } from '@/apis/homework/get-homework-list';
import { IHomeworkList, IProgressPercentage } from '@/apis/homework/homework';
import TutoringStudentProfile from '@/components/TutoringStudentProfile';
import HomeworkList from '@/components/HomeworkList';
import userSessionAtom from '@/recoil/atoms/userSession';
import LoginModal from '@/components/LoginModal';

interface ScheduleContainerProps {
    tutorings: ITutorings;
    tutoringSchedules: ITutoringSchedules;
    homeworkList: IHomeworkList;
    progressPercentage: IProgressPercentage;
}

const ScheduleContainer = ({ ...pageProps }: ScheduleContainerProps) => {
    const { tutoringSchedules, homeworkList } = pageProps;

    const userSession = useRecoilValue(userSessionAtom);

    if (userSession?.role === 'GUEST') return <RegistUserInfoContainer />;

    return (
        <HomeLayout>
            <StyledScheduleContainer>
                {!userSession ? (
                    <LoginModal />
                ) : (
                    <>
                        <ClassSchedule tutoringSchedules={tutoringSchedules} />
                        <SelectedTutoring>
                            <TutoringStudentProfile />
                            <HomeworkList homeworkList={homeworkList} />
                        </SelectedTutoring>
                    </>
                )}
            </StyledScheduleContainer>
        </HomeLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context;

    /**
     * TODO : check auth hoc 생성
     * LoginModal이 컨테이너 내부에 생성되도록
     */
    const hasAuth = getCookie('accessToken', { req });
    if (!hasAuth) {
        return { props: {} };
    }

    /**
     * tutorings: 과외목록
     * tutoringSchedules: 과외일정
     * homeworkList: 숙제목록
     * tutoringTextbooks: 학습자료
    //  */
    // const tutorings = await getTutorings(userRole);
    // const tutoringSchedules = await getTutoringSchedules(userRole, getYearMonth(new Date()));
    const homeworkListInfo = await getHomeworkList(1); // tutoringId
    const homeworkList = homeworkListInfo?.homeworkList;
    const progressPercentage = homeworkListInfo?.progressPercentage;

    return { props: { homeworkList: homeworkList, progressPercentage: progressPercentage } };
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
