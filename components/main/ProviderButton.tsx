'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

import ProviderButtonCheck from '@/components/main/ProviderButtonCheck';

export default async function SignIn({
    provider,
    color,
    children,
}: {
    provider: string;
    color: string;
    children?: React.ReactNode;
}) {
    return (
        <button
            className={`provider-button`}
            style={{ '--provider-color': `${color}` } as React.CSSProperties}
            onClick={() => signIn(provider)}
        >
            {provider}
        </button>
    );
}
