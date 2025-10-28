import { EventType, SystemEventType } from '@/types/EventType';
import providers from '@/data/providers.json';

import { processFormatter } from '../../utils/processFormatter';
import goalsUpdate from '../../utils/goalsUpdate';

const clients: Record<string, Set<WritableStreamDefaultWriter>> = {};

async function sendEventToUser(userId: string, event: EventType | SystemEventType) {
    let { service, subscription, mock, data } = event;
    let eventSubData = {};

    // userId is only present in non-system events
    if ('userId' in event) {
        // recast some types
        service = event.service as keyof typeof providers;
        subscription = event.subscription as keyof (typeof providers)[keyof typeof providers]['eventsub'];

        event.userId = userId;
        eventSubData = providers[service]?.eventsub?.[subscription];
    }

    // determine general event type for formatting
    let generalSubscription: string | undefined = undefined;
    if (service !== 'orbt' && providers[service].eventsub && subscription in providers[service].eventsub) {
        const eventsub = providers[service].eventsub as Record<string, { event?: string }>;
        generalSubscription = eventsub[subscription]?.event;
    }

    // Format data if formatter exists
    if (generalSubscription) {
        let formatter = undefined;
        event.subscription = generalSubscription as any;

        try {
            const mod = await import(`@/types/events/${generalSubscription}.ts`);
            formatter = mod[generalSubscription];

            // mock events already have formatted data
            if (!mock) event.data = processFormatter(formatter, data, service);

            // add subpoints (not applicable to all services, but we still check)
            if (event.data?.tier) {
                const tierPoints: { [key: string]: number } = {
                    '1000': 1,
                    Prime: 1,
                    '2000': 2,
                    '3000': 6,
                };
                event.data.subPoints = tierPoints[event.data.tier as string] ?? 0;
            }

            // ping the provider endpoint, if applicable
            if ('endpoint' in eventSubData) {
                await fetch(`${process.env.API}/eventsub/service/${service}/${eventSubData.endpoint}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(event),
                }).catch(() => {});
            }

            // update the event text if applicable
            if (formatter?.text?.[service]) {
                if (typeof formatter.text[service] === 'function') {
                    event.data.text = formatter.text[service](event.data);
                }
            }

            // update goals if applicable
            if ('goals' in eventSubData) {
                event.data.goals = await goalsUpdate(userId, service, subscription as string, event, !!mock);
            }
        } catch (e) {
            formatter = undefined;
        }
    }

    const encoder = new TextEncoder();
    const formattedData = `data: ${JSON.stringify(event)}\n\n`;
    if (clients[userId]) {
        for (const writer of Array.from(clients[userId])) {
            writer.write(encoder.encode(formattedData));
        }
        return true;
    }
    throw new Error('No clients for user');
}

export { clients, sendEventToUser };
