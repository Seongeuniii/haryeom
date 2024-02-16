import axios from 'axios';

const path = '/room';

interface ReturnType {
    roomCode: string;
}

export const getClassRoomCode = async (scheduleId: number) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${scheduleId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
