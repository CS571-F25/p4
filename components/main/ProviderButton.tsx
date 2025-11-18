'use client';
import { useState, useEffect, useRef } from 'react';
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
    const usernameRef = useRef<HTMLSpanElement>(null);

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

                if (data[provider]) {
                    fetch(`/api/eventsub/service/${provider}/getUser?userId=${data[provider]}`)
                        .then((res) => res.json())
                        .then((userData) => {
                            if (usernameRef.current) {
                                usernameRef.current.textContent = userData.broadcaster_name || 'connected';
                            }
                        })
                        .catch(() => {
                            if (usernameRef.current) {
                                usernameRef.current.textContent = 'connected';
                            }
                        });
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        }

        fetchProviders();
    }, [provider]);

    if (!onClick) onClick = () => signIn(provider);

    let background = <div className="provider-badge-inactive"></div>;
    if (isLoggedIn === null) {
        background = <Spinner loading={true} className="my-[-1rem] mx-[-0.5rem] !text-[var(--provider-color)]" />;
    } else if (isLoggedIn) {
        background = <Svg name="badge" className="provider-badge transition-transform" />;
    }

    let textElement;
    if (isLoggedIn === null) textElement = 'loading...';
    else if (!isLoggedIn) textElement = 'not connected';
    else if (usernameRef.current) textElement = usernameRef.current.textContent || 'connected';
    else textElement = 'connected';

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
                    <span ref={usernameRef} className="provider-text">
                        {textElement}
                    </span>
                </>
            )}
        </span>
    );
}
