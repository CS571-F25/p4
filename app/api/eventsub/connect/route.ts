import { NextRequest } from 'next/server';
import connect from '@/mongo/db';
import WidgetUser from '@/mongo/models/WidgetUser';
import { clients, sendEventToUser } from './utils/sendEventToUser';

// SSE endpoint for clients to connect and receive real-time events
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId')?.trim();
    if (!userId) {
        return new Response('User ID is required', { status: 400 });
    }

    await connect();
    const user = (await WidgetUser.findOne({ userId }).select('providers -_id').lean()) as {
        providers?: Record<string, { id: string }>;
    } | null;
    if (!user) {
        return new Response('User not found', { status: 404 });
    }
    const providerIds = Object.values(user.providers || {})
        .map((p) => p.id)
        .filter(Boolean);

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // register this client for all their provider IDs, including their userId for system events
    for (const providerId of [userId, ...providerIds]) {
        if (!clients[providerId]) clients[providerId] = new Set();
        clients[providerId].add(writer);
    }
    sendEventToUser(userId, {
        service: 'orbt',
        subscription: 'connected',
        data: {
            message: `Client connected for user ${userId}`,
        },
    });

    // Send initial SSE headers
    const encoder = new TextEncoder();
    writer.write(encoder.encode('retry: 10000\n\n'));

    // Remove client on disconnect
    req.signal.addEventListener('abort', () => {
        for (const providerId of [userId, ...providerIds]) {
            if (clients[providerId]) {
                clients[providerId].delete(writer);
                if (clients[providerId].size === 0) {
                    delete clients[providerId];
                }
            }
        }
        writer.close();
    });

    return new Response(stream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
}