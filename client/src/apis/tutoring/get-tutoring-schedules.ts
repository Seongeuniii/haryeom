import axios from 'axios';
import { ITeacherTutoringSchedules, IStudentTutoringSchedules } from './tutoring';
import { IUserRole } from '../user/user';

const path = '/tutoring/schedule';

interface ReturnType {
    teacherTutoringSchedules?: ITeacherTutoringSchedules;
    studentTutoringSchedules?: IStudentTutoringSchedules;
}

export const getTutoringSchedules = async (userRole: IUserRole, yearmonth: string) => {
    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${userRole}?yearmonth=${yearmonth}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
