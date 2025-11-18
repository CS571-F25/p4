import { NextRequest, NextResponse } from 'next/server';
import connect from '@/mongo/db';
import WidgetUser from '@/mongo/models/WidgetUser';
import { sendEventToUser } from '../../connect/utils/sendEventToUser';

// Receives Twitch EventSub notifications and forwards them to connected clients
export async function POST(req: NextRequest) {
    const messageType = req.headers.get('twitch-eventsub-message-type');
    const body = await req.json();

    // Handle Twitch EventSub verification
    if (messageType === 'webhook_callback_verification') {
        await connect();
        await WidgetUser.findOneAndUpdate(
            {
                'providers.twitch.id':
                    body.subscription.condition.broadcaster_user_id ?? body.subscription.condition.to_broadcaster_user_id,
            },
            {
                $push: {
                    'providers.twitch.eventsub': {
                        id: body.subscription.id,
                        type: body.subscription.type,
                        version: body.subscription.version,
                        condition: body.subscription.condition,
                    },
                },
            },
            { new: true, upsert: false }
        );
        return new NextResponse(body.challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }

    // Handle Twitch EventSub notifications
    if (messageType === 'notification') {
        const userId = body.event.broadcaster_user_id || body.event.to_broadcaster_user_id;
        sendEventToUser(userId, { service: 'twitch', subscription: body.subscription.type, data: body.event });

        return new NextResponse(null, { status: 204 });
    }

    // For other message types or errors
    return new NextResponse('Bad Request', { status: 400 });
}

// GET endpoint to retrieve Twitch EventSub subscriptions for a user
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
        return NextResponse.json({ error: 'Twitch userId is required' }, { status: 401 });
    }

    const accessToken = await fetch(`${process.env.API}/eventsub/service/twitch/appaccess`).then((res) =>
        res.json().then((data) => data.accessToken)
    );

    const response = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
        method: 'GET',
        headers: {
            'Client-Id': process.env.AUTH_TWITCH_ID || '',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
