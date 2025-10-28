import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import connect from '@/mongo/db';
import WidgetUser from '@/mongo/models/WidgetUser';
import WidgetUserType from '@/types/WidgetUserType';

function generateID() {
    return Math.random().toString(36).substring(2, 14).toUpperCase();
}

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) {
        return NextResponse.json({ error: 'User ID not found in cookies' }, { status: 401 });
    }

    await connect();

    const userData = (await WidgetUser.findOne({ userId }).select('providers -_id').lean()) as {
        providers: Record<string, unknown>;
    } | null;

    if (!userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(Object.keys(userData.providers), { status: 200 });
}

export async function POST(request: Request) {
    await connect();
    const provider = await request.json();
    if (!provider) {
        return NextResponse.json({ error: 'Provider is required' }, { status: 400 });
    }

    const userData = (await WidgetUser.findOne({
        [`providers.${provider.provider}.id`]: provider.id,
    })
        .select('userId providers -_id')
        .lean()) as WidgetUserType | null;

    if (userData) {
        return NextResponse.json(
            { userId: userData.userId, provider: provider.provider, providerId: provider.id },
            { status: 200 }
        );
    }

    const newUser = WidgetUser.create({
        userId: generateID(),
        providers: {
            [provider.provider]: {
                id: provider.id,
                accessToken: provider.accessToken,
                refreshToken: provider.refreshToken,
                accessTokenExpires: provider.expires,
            },
        },
    });

    return NextResponse.json(newUser, { status: 201 });
}
