import axios from 'axios';
import { IOpenTeacherDetail } from './matching';

const path = '/matching/teachers';

type ReturnType = IOpenTeacherDetail;

// TODO : 필터 파라미터 추가
export const getOpenTeacherDetail = async (teacherId: number | null) => {
    if (!teacherId) return;

    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}/${teacherId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
