import React from 'react';
import providers from '@/data/providers.json';

import SVG from '@/components/Svg';

export default function EventButton({
    provider,
    event,
    name,
    userId,
    onClick,
    setTestData,
}: {
    provider: keyof typeof providers;
    event: string;
    name: string;
    userId: string;
    onClick: () => void;
    setTestData: (data: any) => void;
}) {
    function primaryClick() {
        onClick();
        fetch('/api/eventsub/test', {
            method: 'POST',
            body: JSON.stringify({ service: provider, subscriptionType: event, userId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    function secondaryClick() {
        fetch(`/api/eventsub/test?service=${provider}&subscriptionType=${event}`)
            .then((res) => res.json())
            .then((data) => setTestData({ ...data, subscription: name }));
    }

    return (
        <div className="event-button">
            <button onClick={primaryClick} className="primary-button">
                {name}
            </button>
            <button onClick={secondaryClick} className="secondary-button flex items-center justify-center">
                <SVG
                    name="gear-2"
                    tooltip={{ text: `enter custom ${name} event data`, location: 'left' }}
                    className="secondary-button-icon"
                />
            </button>
        </div>
    );
}
