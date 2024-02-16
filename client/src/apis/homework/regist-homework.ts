import { INewHomework } from '@/components/CreateNewHomework/CreateNewHomework';
import axios from 'axios';

const path = '/tutoring';

export const registHomework = async (tutoringId: number, newHomework: INewHomework) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${tutoringId}/homework`,
            newHomework
        );
        return res.headers.location; // homework/1
    } catch (e) {
        return null;
    }
};
