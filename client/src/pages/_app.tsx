import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import axios from 'axios';
import { hasCookie, setCookie } from 'cookies-next';
import GlobalStyle from '@/theme/GlobalStyle';
import theme from '@/theme';
import MainLayout from '@/components/layouts/MainLayout';
import { getUser } from '@/apis/user/get-user';
import { IUser } from '@/apis/user/user';
import userSession from '@/recoil/atoms/userSession';

interface MyAppProps extends AppProps {
    loginUserData: IUser | undefined;
}

function MyApp({ Component, pageProps, loginUserData }: MyAppProps) {
    const [queryClient] = useState(() => new QueryClient());

    const initializer = useMemo(
        () =>
            ({ set }: MutableSnapshot) => {
                set(userSession, loginUserData);
            },
        [loginUserData]
    );

    return (
        <RecoilRoot initializeState={initializer}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </ThemeProvider>
            </QueryClientProvider>
        </RecoilRoot>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const { ctx } = appContext;

    let user: IUser | undefined;
    let cookie: string | undefined;

    if (ctx.req && hasCookie('accessToken', { req: ctx.req })) {
        cookie = ctx.req.headers.cookie;
        axios.defaults.headers.common['Cookie'] = cookie;
        user = await getUser(ctx);
    }

    if (user) {
        setCookie('userRole', user.role, ctx);
    }

    const appProps = App.getInitialProps(appContext);
    return { ...appProps, loginUserData: user };
};

export default MyApp;
