import React from 'react';
import providers from '@/data/providers.json';

export default function EventButton({ provider, event, name }: { provider: keyof typeof providers, event: string, name: string }) {
    function handleClick() {
        fetch('/api/eventsub/test', {
            method: 'POST',
            body: JSON.stringify({ service: provider, subscriptionType: event }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return (
        <div className="event-button">
            <button onClick={handleClick} className="primary-button">
                {name}
            </button>
            <button>...</button>
        </div>
    );
}