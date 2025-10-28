import { NextResponse } from 'next/server';
import connect from '@/mongo/db';
import WidgetUser from '@/mongo/models/WidgetUser';

export async function GET(req: Request) {
    // make a post to https://id.twitch.tv/oauth2/token
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.AUTH_TWITCH_ID || '',
            client_secret: process.env.AUTH_TWITCH_SECRET || '',
            grant_type: 'client_credentials',
        }),
    });
    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to get access token' }, { status: response.status });
    }
    const data = await response.json();
    if (!data.access_token) {
        return NextResponse.json({ error: 'Access token not found in response' }, { status: 500 });
    }

    return NextResponse.json(
        {
            accessToken: data.access_token,
            expiresIn: data.expires_in,
        },
        { status: 200 }
    );
}
