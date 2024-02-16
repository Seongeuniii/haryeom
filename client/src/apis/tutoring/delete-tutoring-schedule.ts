import axios from 'axios';

const path = '/tutoring/schedule';

export const deleteTutoringSchedule = async (tutoringScheduleId: number | null) => {
    if (!tutoringScheduleId) return;

    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringScheduleId}`, {
            withCredentials: true,
        });
    } catch (e) {
        console.log(e);
    }
};
