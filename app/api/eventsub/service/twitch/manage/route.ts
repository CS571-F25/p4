import { NextResponse } from 'next/server';
import providers from '@/data/providers.json';
import connect from '@/mongo/db';

// Creates Twitch EventSub subscriptions for a given user
export async function POST(req: Request) {
    const { userId } = await req.json();
    if (!userId) {
        return NextResponse.json({ error: 'User ID not found in cookies' }, { status: 401 });
    }

    const accessToken = await fetch(`${process.env.API}/eventsub/service/twitch/appaccess`).then((res) =>
        res.json().then((data) => data.accessToken)
    );

    await connect();

    const callbackUrl = `${process.env.API}/eventsub/service/twitch`;
    const secret = process.env.WEBHOOK_SECRET;

    const results = [];

    const twitchEventSubEndpoints = Object.entries(providers.twitch.eventsub) || [];
    for (const [name, { version }] of twitchEventSubEndpoints) {
        const eventType = `${name}.v${version}`;

        const body = {
            type: name,
            version,
            condition: {
                broadcaster_user_id: userId,
                user_id: userId,
                moderator_user_id: userId,
                to_broadcaster_user_id: userId,
            },
            transport: {
                method: 'webhook',
                callback: callbackUrl,
                secret,
            },
        };

        try {
            const response = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
                method: 'POST',
                headers: {
                    'Client-Id': process.env.AUTH_TWITCH_ID || '',
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            results.push(result);
        } catch (err) {
            results.push({
                event: eventType,
                status: 500,
                success: false,
                error: err,
            });
        }
    }

    return new Response(JSON.stringify(results), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

// Deletes all Twitch EventSub subscriptions for a given user
export async function DELETE(req: Request) {
    const { userId } = await req.json();
    if (!userId) {
        return NextResponse.json({ error: 'User ID not found in cookies' }, { status: 401 });
    }
    const accessToken = await fetch(`${process.env.API}/eventsub/service/twitch/appaccess`).then((res) =>
        res.json().then((data) => data.accessToken)
    );
    await connect();
    const response = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
        method: 'GET',
        headers: {
            'Client-Id': process.env.AUTH_TWITCH_ID || '',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (!data.data) {
        return NextResponse.json({ error: 'No subscriptions found' }, { status: 404 });
    }
    const userSubscriptions = data.data.filter(
        (sub: any) =>
            sub.condition.broadcaster_user_id === userId ||
            sub.condition.user_id === userId ||
            sub.condition.moderator_user_id === userId ||
            sub.condition.to_broadcaster_user_id === userId
    );
    const results = [];
    for (const sub of userSubscriptions) {
        try {
            const deleteResponse = await fetch(`https://api.twitch.tv/helix/eventsub/subscriptions?id=${sub.id}`, {
                method: 'DELETE',
                headers: {
                    'Client-Id': process.env.AUTH_TWITCH_ID || '',
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (deleteResponse.ok) {
                results.push({ id: sub.id, status: 'deleted' });
            } else {
                results.push({ id: sub.id, status: 'failed to delete', error: await deleteResponse.text() });
            }
        } catch (err) {
            results.push({ id: sub.id, status: 'error', error: err });
        }
    }
    return new Response(JSON.stringify(results), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
