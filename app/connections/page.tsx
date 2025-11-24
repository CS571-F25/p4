'use client';
import '@/styles/providers.css';

import providers from '@/data/providers.json';
import ProviderButton from '@/components/main/ProviderButton';

export default function Connections() {
    function logOut() {
        fetch('/api/user/cookie', {
            method: 'DELETE',
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <div id="provider-container">
            <p>include events & data from popular services</p>
            <div id="provider-button-container">
                {Object.entries(providers).map(([provider, { color }], i) => (
                    <ProviderButton key={i} provider={provider} color={color} textStatus={true} />
                ))}
            </div>
            <button id="log-out" onClick={logOut}>
                log out (does not delete connected services)
            </button>
        </div>
    );
}
