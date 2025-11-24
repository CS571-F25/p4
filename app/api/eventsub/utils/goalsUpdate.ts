import connect from '@/mongo/db';
import WidgetGoal from '@/mongo/models/WidgetGoal';
import providers from '@/data/providers.json';

import { getWeekStart, getMonthStart } from './getTimestamp';

export default async function goalsUpdate(userId: string, service: string, subscription: string, event: any, mock: boolean) {
    await connect();
    const goalsData: { [key: string]: any } = {};

    const typedService = service as keyof typeof providers;
    const typedSubscription = subscription as keyof (typeof providers)[keyof typeof providers]['eventsub'];

    const eventSub = providers[typedService].eventsub[typedSubscription];
    if (!eventSub || !('goals' in eventSub)) return goalsData;
    const goals = eventSub.goals || [];

    await Promise.all(
        goals.map(async ({ name, value }: { name: string; value: any }) => {
            if (typeof value === 'string' && event.data[value]) {
                value = event.data[value];
            }

            const mockValue = value;
            if (mock) value = 0; // do not edit goals for mock events

            const now = new Date();
            const weekStart = getWeekStart();
            const monthStart = getMonthStart();

            await WidgetGoal.updateMany(
                { userId, provider: service, goalType: name },
                [
                    {
                        $set: {
                            'values.weekly.value': {
                                $cond: [{ $lt: ['$values.weekly.lastReset', weekStart] }, 0, '$values.weekly.value'],
                            },
                            'values.weekly.lastReset': {
                                $cond: [{ $lt: ['$values.weekly.lastReset', weekStart] }, now, '$values.weekly.lastReset'],
                            },
                        },
                    },
                    {
                        $set: {
                            'values.monthly.value': {
                                $cond: [{ $lt: ['$values.monthly.lastReset', monthStart] }, 0, '$values.monthly.value'],
                            },
                            'values.monthly.lastReset': {
                                $cond: [{ $lt: ['$values.monthly.lastReset', monthStart] }, now, '$values.monthly.lastReset'],
                            },
                        },
                    },
                ],
                { upsert: true }
            );

            const goals = await WidgetGoal.findOneAndUpdate(
                { userId, provider: service, goalType: name },
                {
                    $inc: {
                        'values.total.value': value,
                        'values.weekly.value': value,
                        'values.monthly.value': value,
                        'values.session.value': value,
                        mockValue: mock ? mockValue : 0,
                    },
                },
                { upsert: true, new: true }
            );

            goalsData[name] = Object.fromEntries(
                Object.entries(goals.values).map(([key, obj]) => [key, (obj as { value: number }).value + goals.mockValue])
            );
            if (mock) goalsData[name].mockValue = mockValue;
        })
    );

    return goalsData;
}
