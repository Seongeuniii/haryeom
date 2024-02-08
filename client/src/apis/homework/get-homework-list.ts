import axios from 'axios';
import { IHomeworkList, IProgressPercentage } from './homework';

const path = '/tutoring';

interface ReturnType {
    homeworkList: IHomeworkList;
    progressPercentage: IProgressPercentage;
}

export const getHomeworkList = async (tutoringId: number) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringId}/homework`
        );
        console.log(res.data);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
