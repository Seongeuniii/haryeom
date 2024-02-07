import axios from 'axios';

const path = '/lesson/video';

export const startTutoring = async (tutoringScheduleId: number) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringScheduleId}`,
            {},
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
        return res.data;
    } catch (e) {
        return null;
    }
};

export const endTutoring = async (tutoringScheduleId: number) => {
    try {
        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringScheduleId}`,
            {},
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        );
        return res.data;
    } catch (e) {
        return null;
    }
};
