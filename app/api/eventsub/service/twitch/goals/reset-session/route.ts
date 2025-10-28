import { NextRequest } from 'next/server';
import connect from '@/mongo/db';
import WidgetGoal from '@/mongo/models/WidgetGoal';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { userId, service } = body;

    await connect();
    await WidgetGoal.updateMany({ userId, provider: service }, { $set: { 'values.session.value': 0 } });

    return new Response('Session goals reset', { status: 200 });
}
