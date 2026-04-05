"use client";

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import SessionTimeoutManager from './components/SessionTimeoutManager';

interface ProvidersProps {
    children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <SessionProvider>
            <SessionTimeoutManager />
            {children}
        </SessionProvider>
    );
};

export default Providers;