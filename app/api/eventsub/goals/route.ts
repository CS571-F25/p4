import { NextRequest } from 'next/server';
import connect from '@/mongo/db';
import WidgetUser from '@/mongo/models/WidgetUser';
import WidgetGoal from '@/mongo/models/WidgetGoal';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const orbtId = searchParams.get('orbtId');
    const service = searchParams.get('service');
    let userId = searchParams.get('userId');

    if (!service) return new Response('Missing service', { status: 400 });
    if (!userId) {
        if (!orbtId) return new Response('Missing userId', { status: 400 });
        else {
            await connect();
            const user = await WidgetUser.findOne({ userId: orbtId }).lean() as {
                providers: Record<string, { id: string }>;
            } | null;
            if (!user) return new Response('User not found', { status: 404 });
            if (!user.providers[service]) return new Response('Service not found', { status: 404 });

            userId = user.providers[service].id;
        }
    }

    await connect();
    const goals = await WidgetGoal.find({ userId, provider: service });

    return new Response(JSON.stringify(goals), { status: 200 });
}
