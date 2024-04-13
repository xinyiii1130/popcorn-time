'use client';

import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, ConfigProviderProps } from 'antd';
import { gothamFont } from '@/config/font';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

const antDesignGlobalConfig: ConfigProviderProps = {
    theme: {
        token: {
            fontFamily: gothamFont.style.fontFamily,
        },
    },
    autoInsertSpaceInButton: false,
};

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider {...antDesignGlobalConfig}>
                <Suspense>{children}</Suspense>
            </ConfigProvider>
        </QueryClientProvider>
    );
}
