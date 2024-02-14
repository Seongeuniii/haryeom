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
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { getTextbooks } from '@/apis/tutoring/get-textbooks';
import CreateNewHomework from '@/components/CreateNewHomework';
import { getTutorings } from '@/apis/tutoring/get-tutorings';
import { useGetHomeworkList } from '@/queries/useGetHomeworkList';
import TextbookList from '@/components/TextbookList';
import HomeworkProgressPercentage from '@/components/Homework/HomeworkProgressPercentage';
import TutoringVideoList from '@/components/TutoringVideoList';
import { useGetTutoringVideoList } from '@/queries/useGetTutoringVideoList';

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
        tutoringTextbooks: initTutoringTextbooks = [],
    } = pageProps;

    console.log(
        tutorings,
        tutoringSchedules,
        initHomeworkList,
        initProgressPercentage,
        initTutoringTextbooks
    );
    console.log(userSession);

    const [seletedTutoring, setSelectedTutoring] = useState<
        ITeacherTutoring | IStudentTutoring | undefined
    >(tutorings[0]);
    const [textbooks, setTextbooks] = useState<ITutoringTextbook[]>(initTutoringTextbooks);

    const { data } = seletedTutoring
        ? (useGetHomeworkList(seletedTutoring.tutoringId, {
              homeworkList: initHomeworkList,
              progressPercentage: initProgressPercentage,
          }) as {
              data: { homeworkList: IHomeworkList; progressPercentage: IProgressPercentage };
          })
        : { data: undefined };
    const { homeworkList, progressPercentage } = data ?? {
        homeworkList: initHomeworkList,
        progressPercentage: initProgressPercentage,
    };
    const { data: videoList } = seletedTutoring
        ? useGetTutoringVideoList(seletedTutoring.subject.subjectId)
        : { data: undefined };

    // 교재 목록을 비동기적으로 불러오는 로직
    useEffect(() => {
        const fetchTextbooks = async () => {
            if (seletedTutoring && seletedTutoring.tutoringId) {
                try {
                    const fetchedTextbooks = await getTextbooks(seletedTutoring.tutoringId);
                    setTextbooks(fetchedTextbooks || []);
                } catch (error) {
                    console.error('Error fetching textbooks:', error);
                }
            }
        };

        fetchTextbooks();
    }, [seletedTutoring?.tutoringId]);

    const [listTab, setListTab] = useState<'homework' | 'textbook' | 'review'>('homework');

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
                        <Container>
                            <ProfileContainer>
                                <TutoringTeacherProfile
                                    seletedTutoring={seletedTutoring as IStudentTutoring}
                                    setSelectedTutoring={
                                        setSelectedTutoring as Dispatch<
                                            SetStateAction<IStudentTutoring>
                                        >
                                    }
                                    tutorings={tutorings as IStudentTutorings}
                                />
                            </ProfileContainer>
                            <ChartContainer>
                                <HomeworkProgressPercentage
                                    progressPercentage={progressPercentage}
                                />
                            </ChartContainer>
                        </Container>
                    )}
                    <ListSection>
                        <ListHeader>
                            <Title>
                                <Tab
                                    selected={listTab === 'homework'}
                                    onClick={() => setListTab('homework')}
                                >
                                    숙제
                                </Tab>
                                <Tab
                                    selected={listTab === 'textbook'}
                                    onClick={() => setListTab('textbook')}
                                >
                                    학습자료
                                </Tab>
                                {userSession.role === 'STUDENT' && (
                                    <Tab
                                        selected={listTab === 'review'}
                                        onClick={() => setListTab('review')}
                                    >
                                        복습
                                    </Tab>
                                )}
                            </Title>
                            {userSession.role === 'TEACHER' && tutorings && (
                                <CreateNewHomework
                                    tutoringId={seletedTutoring?.tutoringId}
                                    tutoringTextbooks={textbooks}
                                />
                            )}
                        </ListHeader>
                        {listTab === 'homework' && <HomeworkList homeworkList={homeworkList} />}
                        {listTab === 'textbook' && <TextbookList textbookList={textbooks} />}
                        {listTab === 'review' && <TutoringVideoList videoList={videoList} />}
                    </ListSection>
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

const SelectedTutoring = styled.main`
    width: 67%;
    height: 93%;
    display: flex;
    flex-direction: column;
`;

const ListHeader = styled.div`
    width: 100%;
    padding: 0.3em 0.6em 1.2em 0em;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 0.5em;
`;

const Tab = styled.span<{ selected: boolean }>`
    padding: 6px 8px;
    border-radius: 0.5em;
    font-size: 16px;
    font-weight: ${({ theme, selected }) => (selected ? 600 : 400)};
    background-color: ${({ theme, selected }) => (selected ? theme.PRIMARY : 'white')};
    color: ${({ theme, selected }) => (selected ? 'white' : theme.LIGHT_BLACK)};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme, selected }) =>
            selected ? theme.PRIMARY : theme.PRIMARY_LIGHT};
        color: white;
        transition: all 0.5s;
    }
`;

const ListSection = styled.div`
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

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 30vh;
`;

const ProfileContainer = styled.div`
    width: 80%;
    padding-right: 5px;
`;

const ChartContainer = styled.div`
    width: 20%;
    padding-left: 5px;
`;

export default WithAuth(ScheduleContainer);
