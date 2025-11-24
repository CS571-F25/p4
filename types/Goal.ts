import providers from '@/data/providers.json';

type GoalValue = {
    value: number;
    lastReset?: Date;
};

export type Goal = {
    provider: keyof typeof providers;
    userId: string;
    goalType: string;
    goal: number;
    mockValue: number;
    values: {
        total: GoalValue;
        session: GoalValue;
        weekly: GoalValue;
        monthly: GoalValue;
    };
};
