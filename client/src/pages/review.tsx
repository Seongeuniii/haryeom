/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeLayout from '@/components/layouts/HomeLayout';

interface ITextbook {
    textbookId: number;
    textbookName: string;
    textbookUrl: string;
    totalPage: number;
}

interface ISubject {
    subjectId: number;
    subjectName: string;
}

interface IHomework {
    homeworkId: number;
    deadline: string;
    pageStart: number;
    pageEnd: number;
}

interface IVideo {
    videoId: number;
    title: string;
    scheduleDate: string;
    duration: string;
}

const Review = () => {
    const [reviewType, setReviewType] = useState<string>('');

    const [textbookList, setTextbookList] = useState<ITextbook[]>([
        {
            textbookId: 1,
            textbookName: '호랭이 문제집',
            textbookUrl: 'test.url',
            totalPage: 243,
        },
        {
            textbookId: 2,
            textbookName: '미적분 빈출 100문제',
            textbookUrl: 'test2.url',
            totalPage: 246,
        },
        {
            textbookId: 3,
            textbookName: '10월 모의고사',
            textbookUrl: 'test3.url',
            totalPage: 393,
        },
    ]);

    const [subjectList, setSubjectList] = useState<ISubject[]>([
        {
            subjectId: 1,
            subjectName: '수학',
        },
        {
            subjectId: 2,
            subjectName: '과학',
        },
    ]);
    useEffect(() => {}, []);

    // 숙제 제출 목록 or 영상 저장 목록 클릭시
    useEffect(() => {
        console.log(reviewType);
        // reviewType이 homework인 경우, axios로 textbookList를 땡겨온다 (api/review/homework)
        // reviewType이 video인 경우, axios로 subjectList를 땡겨온다 (api/review/video)
    }, [reviewType]);

    const selectReviewType = (params: SetStateAction<string>) => {
        setReviewType(params);
    };

    const isReviewTypeHomework = () => {
        if (reviewType == 'homework') return true;
        else return false;
    };

    const isReviewTypeVideo = () => {
        if (reviewType == 'video') return true;
        else return false;
    };

    const getTextbookList = () => {
        const result = [];
        for (let i = 0; i < textbookList.length; i++) {
            result.push(<Button key={i}>{textbookList[i].textbookName}</Button>);
        }
        return result;
    };

    const getSubjectList = () => {
        const result = [];
        for (let i = 0; i < subjectList.length; i++) {
            result.push(<Button key={i}>{subjectList[i].subjectName}</Button>);
        }
        return result;
    };

    return (
        <HomeLayout>
            <StyledReview>
                <ReviewTypeSelect>
                    <div>복습 자료 목록</div>
                    <Button onClick={(e) => selectReviewType('homework')}>숙제 제출 목록</Button>
                    <Button onClick={(e) => selectReviewType('video')}>영상 저장 목록</Button>
                </ReviewTypeSelect>
                <div className="v-line" />
                <ReviewContentSelect>
                    {isReviewTypeHomework() && (
                        <ReviewList>
                            <div>숙제목록</div>
                            {getTextbookList()}
                        </ReviewList>
                    )}
                    {isReviewTypeVideo() && (
                        <ReviewList>
                            <div>영상목록</div>
                            {getSubjectList()}
                        </ReviewList>
                    )}
                </ReviewContentSelect>
            </StyledReview>
        </HomeLayout>
    );
};

const StyledReview = styled.div`
    width: 100%;
    height: 100%;
    background-color: aliceblue;
    display: flex;
    // &:hover {
    //     background-color: beige;
    // }
    font-weight: bold;
    .v-line {
        border-left: 1px solid #000;
        height: 80%;
        left: 31.22%;
        top: 20%;
        position: absolute;
    }
    text-align: center;
`;

const Button = styled.button`
    margin: 2em 0;
    padding: 0.5em;
    font-weight: bold;
    border-radius: 0.4em;
    border: solid 1px;
    &:hover {
        background-color: ${({ theme }) => theme.PRIMARY};
        color: ${({ theme }) => theme.WHITE};
    }
`;

const ReviewTypeSelect = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 25%;
    padding: 2em;
`;

const ReviewContentSelect = styled.div`
    font-weight: bold;
    flex-basis: 25%;
    padding: 2em;
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
`;
export default Review;
