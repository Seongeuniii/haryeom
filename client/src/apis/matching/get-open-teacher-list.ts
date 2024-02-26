import axios from 'axios';
import { IOpenTeacher } from './matching';
import { subjectDefaultOptions } from '@/components/FilterOpenTeacherList/filterDefaultOptions';

const path = '/matching/teachers';

type ReturnType = IOpenTeacher[];

export const getOpenTeacherList = async (
    page: number,
    pageSize: number,
    filterers?: { [key: string]: string[] | number }
) => {
    const query = Object.entries(filterers || {})
        .filter(([key, value]) => value !== 0 && !(Array.isArray(value) && value.length === 0))
        .map(([key, value]) => {
            if (key === 'gender') {
                return `${key}=${(value as string[])[0] === '여자' ? 'FEMALE' : 'MALE'}`;
            } else if (key === 'subjectIds') {
                const indexes = (value as string[])
                    .map((subject) => subjectDefaultOptions.indexOf(subject) + 1)
                    .filter((index) => index > 0);
                return `${key}=${indexes.join(',')}`;
            } else {
                return `${key}=${Array.isArray(value) ? value.join(',') : value}`;
            }
        })
        .join('&');

    console.log(query);

    try {
        const res = await axios.get<ReturnType>(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}?page=${page}&pageSize=${pageSize}&${query}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
