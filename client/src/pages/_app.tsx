import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@/theme/GlobalStyle';
import theme from '@/theme';
import MainLayout from '@/components/layouts/MainLayout';
import { RecoilRoot } from 'recoil';

interface MyAppProps extends AppProps {}

function MyApp({ Component, pageProps }: MyAppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <RecoilRoot>
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

export default MyApp;
