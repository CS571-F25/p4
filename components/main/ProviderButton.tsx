'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import Svg from '@/components/Svg';

export default function ProviderButton({
    provider,
    color,
    onClick,
}: {
    provider: string;
    color: string;
    onClick?: () => void;
}) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        async function fetchProviders() {
            try {
                const response = await fetch(`/api/user/`);
                if (!response.ok) {
                    setIsLoggedIn(false);
                    return;
                }
                const data = await response.json();
                setIsLoggedIn(!!provider && data[provider]);
            } catch (error) {
                setIsLoggedIn(false);
            }
        }

        fetchProviders();
    }, [provider]);

    if (!onClick) onClick = () => signIn(provider);

    let background = <div className="provider-badge-inactive"></div>;
    if (isLoggedIn === null) {
        background = <div className="provider-badge-loading"></div>;
    } else if (isLoggedIn) {
        background = <Svg name="badge" className="provider-badge" />;
    }

    return (
        <button
            className={`provider-button`}
            style={{ '--provider-color': `${color}` } as React.CSSProperties}
            onClick={onClick}
        >
            {background}
            {isLoggedIn !== null && <Svg name={provider} className="provider-icon" />}
        </button>
    );
}
