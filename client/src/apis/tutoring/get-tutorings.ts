import axios from 'axios';
import { ITutorings } from './tutoring';
import { IUserRole } from '../user/user';

const path = '/tutoring';

interface ReturnType {
    tutorings: ITutorings;
}

export const getTutorings = async (userRole: IUserRole) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${userRole}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
