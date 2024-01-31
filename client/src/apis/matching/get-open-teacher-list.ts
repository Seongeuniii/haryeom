import axios from 'axios';
import { IOpenTeacher } from './matching';

const path = '/matching/teachers';

type ReturnType = IOpenTeacher[];

// TODO : 필터 파라미터 추가
export const getOpenTeacherList = async () => {
    try {
        const res = await axios.get<ReturnType>(`${process.env.NEXT_PUBLIC_API_SERVER}${path}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
