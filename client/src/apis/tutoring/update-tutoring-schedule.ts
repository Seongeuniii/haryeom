import axios from 'axios';
import { INewSchedule } from './tutoring';

const path = '/tutoring/schedule';

export const updateTutoringSchedule = async (
    tutoringScheduleId: number | null,
    schedule: INewSchedule
) => {
    if (!tutoringScheduleId) return;

    try {
        await axios.put(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringScheduleId}`,
            JSON.stringify({
                ...schedule,
            }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
    } catch (e) {
        console.log(e);
    }
};
