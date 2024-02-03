import axios from 'axios';
import { IHomework } from './homework';

const path = '/homework';

type ReturnType = IHomework;

export const getHomework = async (homeworkId: string) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${homeworkId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
    // return {
    //     homeworkId: 1,
    //     textbook: {
    //         textbookId: 1,
    //         textbookName: '수능특강 수학',
    //         textbookUrl:
    //             'https://d1b632bso7m0wd.cloudfront.net/EBS_2024%ED%95%99%EB%85%84%EB%8F%84_%EC%88%98%EB%8A%A5%ED%8A%B9%EA%B0%95_%EC%88%98%ED%95%99%EC%98%81%EC%97%AD_%EC%88%98%ED%95%99%E2%85%A0.pdf',
    //         totalPage: 250,
    //     },
    //     startPage: 2,
    //     endPage: 6,
    //     drawings: [],
    // };
};
