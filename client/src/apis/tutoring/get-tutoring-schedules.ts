import axios from 'axios';
import { ITutoringSchedules } from './tutoring';
import { IUserRole } from '../user/user';

const path = '/tutoring/schedule';

interface ReturnType {
    [key: string]: ITutoringSchedules;
}

export const getTutoringSchedules = async (userRole: IUserRole, yearmonth: string) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${userRole.toLocaleLowerCase()}?yearmonth=${yearmonth}`
        );
        return res.data[`${userRole.toLocaleLowerCase()}TutoringSchedules`];
    } catch (e) {
        console.log(e);
    }
};
