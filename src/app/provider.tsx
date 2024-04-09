'use client';

import { Suspense } from 'react';
// import ReactLenis from '@studio-freight/react-lenis';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, ConfigProviderProps } from 'antd';
import { gothamFont } from '@/config/font';

// import { MoviesProvider } from '@/context/MovieContext';

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
        // <ReactLenis root>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider {...antDesignGlobalConfig}>
                <Suspense>
                    {children}
                    {/* <MoviesProvider>{children}</MoviesProvider> */}
                </Suspense>
            </ConfigProvider>
        </QueryClientProvider>
        // </ReactLenis>
    );
}
