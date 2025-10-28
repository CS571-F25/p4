'use client';
import '@/styles/providers.css';
import '@/styles/eventsubs.css';

import { useState } from 'react';

import providers from '@/data/providers.json';

export default function Eventsubs() {
    const [selectedProvider, setSelectedProvider] = useState<keyof typeof providers | null>(null);
    const [widgetPreview, setWidgetPreview] = useState('');

    function handleEventClick(name: string) {
        fetch('/api/eventsub/test', {
            method: 'POST',
            body: JSON.stringify({ service: selectedProvider, subscriptionType: name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return (
        <div id="eventsubs">
            {!selectedProvider ? (
                <div id="provider-container">
                    <h1>orbt eventsubs</h1>
                    <ul id="eventsubs-box">
                        {Object.entries(providers).map(([provider], i) => (
                            <li key={i}>
                                <button onClick={() => setSelectedProvider(provider as keyof typeof providers)}>
                                    {provider}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div id="provider-eventsubs">
                    <h1>Selected Provider: {selectedProvider}</h1>
                    <p>click an event to test it</p>
                    {Object.entries(providers?.[selectedProvider]?.eventsub)?.map(([name], i) => (
                        <p key={i}>
                            <button onClick={() => handleEventClick(name)}>{name}</button>
                        </p>
                    ))}
                </div>
            )}

            <div id="widget-preview">
                <input
                    type="text"
                    placeholder="Widget Preview URL"
                    value={widgetPreview}
                    onChange={(e) => setWidgetPreview(e.target.value)}
                />
                <h2>Widget Preview</h2>
                {widgetPreview && <iframe src={widgetPreview} title="Widget Preview" />}
            </div>
        </div>
    );
}
