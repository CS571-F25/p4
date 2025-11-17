import { NextResponse } from 'next/server';

// Get twitch user for a given user
export async function GET(req: Request) {
     const { searchParams } = new URL(req.url);
     const userId = searchParams.get('userId');
    if (!userId) {
        return NextResponse.json({ error: 'Twitch userId is required' }, { status: 401 });
    }

    const accessToken = await fetch(`${process.env.API}/eventsub/service/twitch/appaccess`).then((res) =>
        res.json().then((data) => data.accessToken)
    );

    const response = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${userId}`, {
        method: 'GET',
        headers: {
            'Client-Id': process.env.AUTH_TWITCH_ID || '',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data.data[0]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}