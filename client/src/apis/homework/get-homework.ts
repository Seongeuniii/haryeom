import axios from 'axios';
import { IHomework, ISubmittedHomework } from './homework';

const path = '/homework';

export const getHomework = async (homeworkId: number) => {
    try {
        const res = await axios.get<IHomework>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${homeworkId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getSubmittedHomework = async (homeworkId: number) => {
    try {
        const res = await axios.get<ISubmittedHomework>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/review/${homeworkId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
