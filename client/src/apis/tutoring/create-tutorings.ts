import axios from 'axios';
import { INewSchedule } from './tutoring';

const path = '/tutoring/schedule';

export const createTutorings = async (tutoringId: number, schedules: INewSchedule[]) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}`,
            JSON.stringify({
                tutoringId,
                schedules,
            }),
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
        return res.data;
    } catch (e) {
        return null;
    }
};
