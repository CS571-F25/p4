import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import connect from '@/mongo/db';
import WidgetUser from '@/mongo/models/WidgetUser';

interface UserData {
    userId: string;
}

export async function POST(request: Request) {
    const { provider, providerId } = await request.json();
    if (!provider) return NextResponse.json({ error: 'Provider is required' }, { status: 400 });
    if (!providerId) return NextResponse.json({ error: 'Provider ID is required' }, { status: 400 });

    await connect();

    const userData = (await WidgetUser.findOne({
        [`providers.${provider}.id`]: providerId,
    })
        .select('userId')
        .lean()) as UserData | null;

    if (!userData) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const cookieStore = await cookies();
    cookieStore.set('userId', userData.userId, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 90,
    });

    return NextResponse.json({ userId: userData.userId, provider, providerId: providerId }, { status: 200 });
}
