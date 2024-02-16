import axios from 'axios';
import { ITutoringTextbook } from './tutoring';

const path = '/lesson/timestamp';

interface ITimestamp {
    videoTimestampId: number;
    stampTime: string;
    content: string;
}

type ReturnType = ITimestamp[];

export const getTimestampList = async (tutoringScheduleId: number) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringScheduleId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
