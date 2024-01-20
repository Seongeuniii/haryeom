import axios from 'axios';

const path = '/auth/login';

export const login = async (authCode: string) => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_SERVER}${path}?code=${authCode}`
        );
        const { accessToken } = res.data;
        document.cookie = `accessToken=${accessToken}`;
    } catch {
        console.log('로그인 실패');
    }
};

export const refreshToken = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}${path}`);
    const { accessToken } = res.data;
    document.cookie = `accessToken=${accessToken}`;
};
