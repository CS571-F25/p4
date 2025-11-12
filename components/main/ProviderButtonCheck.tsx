import { useState, useEffect } from 'react';
import { auth } from '@/auth';

import Svg from '@/components/Svg';

export default function ClientTest({ provider }: { provider?: string }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        async function fetchProviders() {
            try {
                const response = await fetch(`/api/user/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch providers');
                }
                const data = await response.json();
                setIsLoggedIn(!!provider && data[provider] !== undefined);
                console.log('Fetched providers:', data);
            } catch (error) {}
        }

        fetchProviders();
    }, []);

    if (isLoggedIn === null) {
        return <div className="provider-badge-loading"></div>;
    }

    let background = <div className="provider-badge-inactive"></div>;
    if (isLoggedIn) {
        background = <Svg name="badge" className="provider-badge" />;
    }

    return (
        <>
            {background}
            <Svg name={provider || ''} className="provider-icon" />
        </>
    );
}
