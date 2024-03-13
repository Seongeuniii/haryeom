import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import HomeLayout from '@/components/layouts/HomeLayout';
import ClassSchedule from '@/components/ClassSchedule';
import {
    ITeacherTutorings,
    ITutoring,
    ITutorings,
    ITutoringSchedules,
    ITutoringTextbook,
} from '@/apis/tutoring/tutoring';
import { getHomeworkList } from '@/apis/homework/get-homework-list';
import { IHomeworkList, IProgressPercentage } from '@/apis/homework/homework';
import HomeworkList from '@/components/HomeworkList';
import userSessionAtom from '@/recoil/atoms/userSession';
import { getTutoringSchedules } from '@/apis/tutoring/get-tutoring-schedules';
import { getYearMonth } from '@/utils/time';
import WithAuth from '@/hocs/withAuth';
import { IUserRole } from '@/apis/user/user';
import { getTextbooks } from '@/apis/tutoring/get-textbooks';
import { getTutorings } from '@/apis/tutoring/get-tutorings';
import { useGetHomeworkList } from '@/queries/useGetHomeworkList';
import TextbookList from '@/components/TextbookList';
import TutoringVideoList from '@/components/TutoringVideoList';
import { useGetTutoringVideoList } from '@/queries/useGetTutoringVideoList';
import { useGetTutoringTextbooks } from '@/queries/useGetTutoringTextbooks';
import LoginModal from '@/components/LoginModal';
import TutoringProfile from '@/components/TutoringProfile';
import Tabs from '@/components/commons/Tabs';
import dynamic from 'next/dynamic';
import Modal from '@/components/commons/Modal';
import { useModal } from '@/hooks/useModal';
const CreateNewClass = dynamic(() => import('@/components/CreateNewClass'), { ssr: false });
const CreateNewHomework = dynamic(() => import('@/components/CreateNewHomework'), { ssr: false });

interface ScheduleContainerProps {
    tutorings: ITutorings;
    tutoringSchedules: ITutoringSchedules;
    homeworkList: IHomeworkList;
    progressPercentage: IProgressPercentage;
    tutoringTextbooks: ITutoringTextbook[];
    openLoginModal: boolean;
}

const ScheduleContainer = ({ ...pageProps }: ScheduleContainerProps) => {
    const {
        tutorings,
        tutoringSchedules,
        homeworkList: _homeworkList,
        progressPercentage: _progressPercentage,
        tutoringTextbooks: _tutoringTextbooks,
        openLoginModal,
    } = pageProps;
    if (openLoginModal) return <LoginModal />;
    if (!tutorings) return null; // 매칭 없음

    const userSession = useRecoilValue(userSessionAtom);
    const [seletedTutoring, setSelectedTutoring] = useState<ITutoring>(tutorings[0]);

    const { homeworkList, refetch } = useGetHomeworkList(seletedTutoring.tutoringId, {
        homeworkList: _homeworkList,
        progressPercentage: _progressPercentage,
    });
    const { tutoringTextbooks } = useGetTutoringTextbooks(
        seletedTutoring.tutoringId,
        _tutoringTextbooks
    );
    const { videoList } = useGetTutoringVideoList(seletedTutoring.tutoringId);

    const [listTab, setListTab] = useState<'homework' | 'textbook' | 'review'>('homework');

    const { open, openModal, closeModal } = useModal();
    const [show, setShow] = useState<boolean>(false);

    return (
        <HomeLayout>
            <StyledScheduleContainer>
                <ClassSchedule
                    tutoringSchedules={tutoringSchedules}
                    CreateNewSchedule={
                        userSession?.role === 'TEACHER'
                            ? () => <CreateNewClass tutorings={tutorings as ITeacherTutorings} />
                            : undefined
                    }
                />
                <SelectedTutoringSection>
                    <TutoringProfile
                        seletedTutoring={seletedTutoring}
                        setSelectedTutoring={setSelectedTutoring}
                        tutorings={tutorings}
                    />
                    <TutoringContents>
                        <TutoringContentsTab>
                            <Tabs
                                tabs={[
                                    {
                                        name: '숙제',
                                        selected: listTab === 'homework',
                                        changeTab: () => setListTab('homework'),
                                    },
                                    {
                                        name: '학습자료',
                                        selected: listTab === 'textbook',
                                        changeTab: () => setListTab('textbook'),
                                    },
                                    {
                                        name: '복습',
                                        selected: listTab === 'review',
                                        changeTab: () => setListTab('review'),
                                    },
                                ]}
                            />
                            {userSession?.role === 'TEACHER' && (
                                <>
                                    <StyledCreateNewHomework>
                                        <OpenModalButton
                                            onClick={() => {
                                                setShow(true);
                                                openModal();
                                            }}
                                        >
                                            +
                                        </OpenModalButton>
                                    </StyledCreateNewHomework>
                                    {show && (
                                        <Modal
                                            open={open}
                                            closeModal={() => {
                                                setShow(false);
                                                closeModal();
                                            }}
                                        >
                                            <CreateNewHomework
                                                tutoringId={seletedTutoring.tutoringId}
                                                tutoringTextbooks={tutoringTextbooks}
                                                refetch={refetch}
                                            />
                                        </Modal>
                                    )}
                                </>
                            )}
                        </TutoringContentsTab>
                        {listTab === 'homework' && <HomeworkList homeworkList={homeworkList} />}
                        {listTab === 'textbook' && (
                            <TextbookList textbookList={tutoringTextbooks} />
                        )}
                        {listTab === 'review' && <TutoringVideoList videoList={videoList} />}
                    </TutoringContents>
                </SelectedTutoringSection>
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
            progressPercentage: homeworkListInfo?.progressPercentage || 0,
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

const SelectedTutoringSection = styled.main`
    width: 67%;
    height: 93%;
    display: flex;
    flex-direction: column;
`;

const TutoringContentsTab = styled.div`
    width: 100%;
    padding: 0.3em 0.6em 1.2em 0em;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TutoringContents = styled.div`
    width: 100%;
    height: 100%;
    padding: 1.8em;
    display: flex;
    flex-direction: column;
    border-radius: 1em;
    background-color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    font-size: 16px;
`;

const StyledCreateNewHomework = styled.div`
    bottom: 1.5em;
    left: 0;
    text-align: center;
`;

const OpenModalButton = styled.button`
    width: 25px;
    height: 25px;
    font-size: 24px;
    border-radius: 100%;
    color: ${({ theme }) => theme.LIGHT_BLACK};
    background-color: ${({ theme }) => theme.LIGHT_BLACK};
    color: white;

    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        color: white;
    }
`;

export default WithAuth(ScheduleContainer);
