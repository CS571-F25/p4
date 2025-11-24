'use client';
import '@/styles/providers.css';
import '@/styles/eventsubs.css';

import { usePathname, useRouter } from 'next/navigation';

import ProviderButton from '@/components/main/ProviderButton';
import OrbtId from '@/components/OrbtId';
import ProviderEventsubs from './ProviderEventsubs';
import { GoalProvider } from '@/contexts/GoalContext';

import providers from '@/data/providers.json';

function NoProviderEventsubs() {
    const router = useRouter();

    function setSelectedProvider(provider: keyof typeof providers) {
        router.push(`/eventsubs/${provider}`);
    }

    return (
        <div id="eventsubs-box" className="block w-full">
            <p>
                eventsub refers to subscription to a platforms events. an example is when you connect a twitch account, the
                widgets can listen for follower, subscriber, and other events.
            </p>
            <p>select one of your connected services to get started</p>
            <div id="provider-container">
                {Object.entries(providers).map(([provider, { color }], i) => (
                    <ProviderButton
                        key={i}
                        provider={provider}
                        color={color}
                        onClick={() => setSelectedProvider(provider as keyof typeof providers)}
                    />
                ))}
            </div>
            <OrbtId />
        </div>
    );
}

export default function Eventsubs() {
    const pathname = usePathname();
    const selectedProvider = pathname.split('/')[2] || '';

    if (!selectedProvider) {
        return <NoProviderEventsubs />;
    }

    return (
        <GoalProvider>
            <ProviderEventsubs provider={selectedProvider as keyof typeof providers} />
        </GoalProvider>
    );
}
