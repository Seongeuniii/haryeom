import axios from 'axios';
import { NextPageContext } from 'next';
import { deleteCookie, setCookie } from 'cookies-next';
import { IUser } from './user';

const path = '/auth';

export const getUser = async (ctx: NextPageContext) => {
    try {
        const res = await axios.get<IUser>(`${process.env.NEXT_PUBLIC_API_SERVER}${path}`);
        return res.data;
    } catch {
        try {
            const { accessToken } = await refreshToken();
            setCookie('accessToken', accessToken, ctx);

            if (ctx.req) {
                const cookie = ctx.req.headers.cookie;
                axios.defaults.headers.common['Cookie'] = cookie;
            }

            const res = await axios.get<IUser>(`${process.env.NEXT_PUBLIC_API_SERVER}${path}`);
            return res.data;
        } catch {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            deleteCookie('userRole');
            console.log('재로그인 필요');
        }
    }
};

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}${path}/refresh`);
    return res.data;
};
