// POST endpoint that takes a body with a service, subscriptionType, userId and optional event data. it then generates data based on @/types/events/{subscriptionType}.ts and sends it to all connected clients for that user.
import { NextRequest, NextResponse } from 'next/server';

import { sendEventToUser } from '../connect/utils/sendEventToUser';
import providers from '@/data/providers.json';
import { generateWithFormat } from '../utils/generateData';

export async function POST(req: NextRequest) {
    const { service, subscriptionType } = await req.json();
    const typedService = service as keyof typeof providers;
    const typedSubscriptionType = subscriptionType as keyof (typeof providers)[typeof typedService]['eventsub'];

    if (!service || !subscriptionType) {
        return new NextResponse('Missing required fields', { status: 400 });
    }

    let generalSubscription = providers[typedService].eventsub[typedSubscriptionType];
    if (!('event' in generalSubscription)) {
        return new NextResponse('Invalid service or subscriptionType', { status: 400 });
    }

    let formatter: any = undefined;

    try {
        const mod = await import(`@/types/events/${generalSubscription.event}.ts`);
        formatter = mod[generalSubscription.event];
    } catch {
        formatter = undefined;
    }

    const mockData = generateWithFormat(service, formatter);

    await sendEventToUser('415504629', { service, subscription: subscriptionType, mock: true, data: mockData }).catch((err) => {
        return new NextResponse(`Failed to send event: ${err.message}`, { status: 500 });
    });

    return new NextResponse('Event sent', { status: 200 });
}
