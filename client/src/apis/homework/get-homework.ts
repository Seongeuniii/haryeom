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
    //         textbookName: '자료명',
    //         textbookURL: 'http://www.e-ffyc.re.kr/xml/03711/03711.pdf',
    //         totalPage: 250,
    //     },
    //     startPage: 2,
    //     endPage: 6,
    //     drawings: [
    //         {
    //             drawingId: 1,
    //             page: 3,
    //             homeworkDrawingURL: '',
    //         },
    //         {
    //             drawingId: 2,
    //             page: 5,
    //             homeworkDrawingURL: '',
    //         },
    //     ],
    // };
};
