'use client';
import '@/styles/providers.css';

import { useUser } from '@/contexts/UserContext';
import providers from '@/data/providers.json';
import ProviderButton from '@/components/main/ProviderButton';

export default function Connections() {
    const { user } = useUser();
    const orbtId = user?.orbtId;

    function logOut() {
        fetch('/api/user/cookie', {
            method: 'DELETE',
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div id="provider-container">
            <p>include events & data from popular services.</p>
            <div id="provider-button-container">
                {Object.entries(providers).map(([provider, { color }], i) => (
                    <ProviderButton key={i} provider={provider} color={color} textStatus={true} />
                ))}
            </div>
            {orbtId && (
                <span className="mt-2">
                    <button id="log-out" className="button" onClick={logOut}>
                        log out
                    </button>
                    <p className="text-xxs">logging out does not delete connected services</p>
                </span>
            )}
        </div>
    );
}
