import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import {
    IReviewVideo,
    ITutoringSubject,
    getTutoringSubjectList,
} from '@/apis/tutoring/get-tutoring-video';
import HomeLayout from '@/components/layouts/HomeLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface ReviewContainerProps {
    tutoringSubjectList: ITutoringSubject[];
}

const ReviewContainer = ({ tutoringSubjectList }: ReviewContainerProps) => {
    const router = useRouter();

    const [tutoringVideoList, setTutoringVideoList] = useState<IReviewVideo[]>();

    const routingToReviewTutoringPage = () => {
        router.push({
            pathname: `/review/1`,
            query: {
                tutoringScheduleId: 3,
            },
        });
    };

    return (
        <HomeLayout>
            <StyledReviewContainer>
                <ReviewContainerHeader>
                    <Title>복습하렴</Title>
                    <SubTitle>제출한 숙제와 화상 과외 녹화본을 통해 복습 시간을 가져봐요.</SubTitle>
                </ReviewContainerHeader>
                {tutoringSubjectList?.map((tutoringSubject) => {
                    return (
                        <Link
                            href={`review/${tutoringSubject.subjectId}`}
                            key={tutoringSubject.subjectId}
                        >
                            <p>Subject: {tutoringSubject.name}</p>
                            <p>id: {tutoringSubject.subjectId}</p>
                        </Link>
                    );
                })}
                <div>비디오 목록</div>
                <></>
                <div>숙제 목록</div>
                <></>
            </StyledReviewContainer>
        </HomeLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tutoringSubjectList = await getTutoringSubjectList();

    return {
        props: {
            tutoringSubjectList: tutoringSubjectList || null,
        },
    };
};

const StyledReviewContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
`;

const ReviewContainerHeader = styled.header`
    width: 100vw;
    height: 8.3em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

const Title = styled.span`
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.5em;
`;

const SubTitle = styled.span`
    font-size: 0.8em;
    padding-left: 0.1em;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export default ReviewContainer;
