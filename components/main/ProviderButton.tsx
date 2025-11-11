'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import ProviderButtonCheck from '@/components/main/ProviderButtonCheck';

export default function ProviderButton({
    provider,
    color,
    onClick,
}: {
    provider: string;
    color: string;
    onClick?: () => void;
}) {
    if (!onClick) onClick = () => signIn(provider);
    
    return (
        <button
            className={`provider-button`}
            style={{ '--provider-color': `${color}` } as React.CSSProperties}
            onClick={onClick}
        >
            <ProviderButtonCheck provider={provider} />
        </button>
    );
}
