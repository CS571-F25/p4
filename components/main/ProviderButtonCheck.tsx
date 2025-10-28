import { useState, useEffect } from 'react';
import { auth } from '@/auth';

import Svg from '@/components/Svg';

export default function ClientTest({ provider }: { provider?: string }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const providerId = '';

    useEffect(() => {
        async function fetchProviders() {
            try {
                if (provider && providerId) {
                    await fetch(`/api/user/cookie`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            provider,
                            providerId,
                        }),
                    });
                }

                const response = await fetch(`/api/user/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch providers');
                }
                const data = await response.json();
                setIsLoggedIn(data.includes(provider));
            } catch (error) {}
        }

        fetchProviders();
    }, []);

    return (
        <>
            {isLoggedIn ? <Svg name="badge" className="provider-badge" /> : <div className="provider-badge-inactive"></div>}
            <Svg name={provider || ''} className="provider-icon" />
        </>
    );
}
