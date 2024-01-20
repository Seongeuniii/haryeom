import axios from 'axios';
import { IUser } from './user';
import { refreshToken } from './get-token';

const path = '/auth';

export const getUser = async (): Promise<IUser | undefined> => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}${path}`);
        const { data } = res;
        return data;
    } catch {
        try {
            await refreshToken();
        } catch {
            console.log('재로그인 필요');
        }
    }
};
