import axios from 'axios';
import { IOpenTeacher } from './matching';

const path = '/matching/teachers';

type ReturnType = IOpenTeacher[];

export const getOpenTeacherList = async (filterers?: { [key: string]: string[] | number }) => {
    const query = Object.entries(filterers || {})
        .filter(([key, value]) => value !== 0 && !(Array.isArray(value) && value.length === 0))
        .map(([key, value]) => {
            if (key === 'gender') {
                return `${key}=${(value as string[])[0] === '여자' ? 'FEMALE' : 'MALE'}`;
            } else {
                return `${key}=${Array.isArray(value) ? value.join(',') : value}`;
            }
        })
        .join('&');

    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}?${query}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
