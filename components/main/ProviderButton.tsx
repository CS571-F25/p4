'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';

import Spinner from '@/components/Spinner';
import Svg from '@/components/Svg';

export default function ProviderButton({
    provider,
    color,
    onClick,
    textStatus = false,
}: {
    provider: string;
    color: string;
    onClick?: () => void;
    textStatus?: boolean;
}) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        async function fetchProviders() {
            try {
                const response = await fetch(`/api/user/`);
                if (!response.ok) {
                    setIsLoggedIn(false);
                    return;
                }
                const data = await response.json();

                fetch(`/api/eventsub/service/${provider}/getUser?userId=${data[provider]}`)
                    .then((res) => res.json())
                    .then((data) => setUsername(data.broadcaster_name))
                    .catch(() => setUsername(''));

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
        background = <Spinner loading={true} className="my-[-1rem] mx-[-0.5rem] text-[var(--provider-color)]" />;
    } else if (isLoggedIn) {
        background = <Svg name="badge" className="provider-badge transition-transform" />;
    }

    return (
        <span className="provider-button-wrapper flex gap-4 items-center">
            <button
                className={`provider-button`}
                style={{ '--provider-color': `${color}` } as React.CSSProperties}
                onClick={onClick}
            >
                {background}
                {isLoggedIn !== null && <Svg name={provider} className="provider-icon" />}
            </button>
            {textStatus && (
                <>
                    <span>{provider}</span>
                    <span>-</span>
                    <span className="provider-text">
                        {isLoggedIn === null ? 'loading...' : isLoggedIn ? username || 'loading...' : 'not connected'}
                    </span>
                </>
            )}
        </span>
    );
}
