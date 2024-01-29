import { INewHomework } from '@/components/CreateNewHomework/CreateNewHomework';
import axios from 'axios';

const path = '/tutoring';

export const registHomework = async (newHomework: INewHomework) => {
    console.log(newHomework);
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${1}/homework`,
            newHomework
        );
        return res.headers.location; // homework/1
    } catch (e) {
        return null;
    }
};
