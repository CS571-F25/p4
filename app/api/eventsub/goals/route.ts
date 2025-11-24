import { NextRequest } from 'next/server';
import connect from '@/mongo/db';
import WidgetUser from '@/mongo/models/WidgetUser';
import WidgetGoal from '@/mongo/models/WidgetGoal';
import { Goal } from '@/types/Goal';

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
            const user = (await WidgetUser.findOne({ userId: orbtId }).lean()) as {
                providers: Record<string, { id: string }>;
            } | null;
            if (!user) return new Response('User not found', { status: 404 });
            if (!user.providers[service]) return new Response('Service not found', { status: 404 });

            userId = user.providers[service].id;
        }
    }

    await connect();
    const goals = await WidgetGoal.find({ userId, provider: service });

    const modifiedGoals = goals.map((goal: Goal & { toObject: () => Goal }) => {
        const plainGoal = goal.toObject();
        const mockValue = plainGoal.mockValue || 0;
        const modifiedValues = Object.entries(plainGoal.values as Goal['values']).reduce(
            (acc, [key, value]) => {
                acc[key as keyof Goal['values']] = {
                    ...value,
                    value: value.value + mockValue,
                };
                return acc;
            },
            {} as Goal['values']
        );
        return {
            ...plainGoal,
            values: modifiedValues,
        };
    });

    return new Response(JSON.stringify(modifiedGoals), {
        status: 200,
    });
}

// DELETE endpoint will clear mock values for all or specific goal types
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const orbtId = searchParams.get('orbtId');
    const service = searchParams.get('service');
    let userId = searchParams.get('userId');
    const goalType = searchParams.get('goalType');

    if (!service) return new Response('Missing service', { status: 400 });
    if (!userId) {
        if (!orbtId) return new Response('Missing userId', { status: 400 });
        else {
            await connect();
            const user = (await WidgetUser.findOne({ userId: orbtId }).lean()) as {
                providers: Record<string, { id: string }>;
            } | null;
            if (!user) return new Response('User not found', { status: 404 });
            if (!user.providers[service]) return new Response('Service not found', { status: 404 });

            userId = user.providers[service].id;
        }
    }

    await connect();

    if (goalType) {
        await WidgetGoal.updateMany({ userId, provider: service, goalType }, { $set: { mockValue: 0 } });
    } else {
        await WidgetGoal.updateMany({ userId, provider: service }, { $set: { mockValue: 0 } });
    }

    return new Response('Mock values cleared', { status: 200 });
}

// POST endpoint will update a goal for a specified service, userId, and goalType
export async function POST(req: NextRequest) {
    const { service, userId, goalType, goal } = await req.json();
    if (!service || !userId || !goalType || goal === undefined) {
        return new Response('Missing required fields', { status: 400 });
    }

    await connect();

    const updatedGoal = await WidgetGoal.findOneAndUpdate(
        { provider: service, userId, goalType },
        { $set: { goal } },
        { new: true }
    );

    if (!updatedGoal) {
        return new Response('Goal not found', { status: 404 });
    }

    return new Response(JSON.stringify(updatedGoal), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
