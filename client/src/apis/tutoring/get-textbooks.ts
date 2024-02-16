import axios from 'axios';
import { ITutoringTextbook } from './tutoring';

const path = '/textbook/tutoring';

type ReturnType = ITutoringTextbook[];

export const getTextbooks = async (tutoringId: number) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
