import axios from 'axios';
import { setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

const path = '/auth/kakao/login';

export const getToken = async (authCode: string, ctx: GetServerSidePropsContext) => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}?code=${authCode}`
        );
        const { accessToken, refreshToken } = res.data;
        setCookie('accessToken', accessToken, ctx);
        setCookie('refreshToken', refreshToken, ctx);
        console.log('success login');
        return true;
    } catch {
        console.log('fail login');
        return false;
    }
};
