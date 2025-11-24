'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Goal } from '@/types/Goal';

interface GoalContextType {
    goals: Goal[];
    setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
    getGoal: (goalType: string) => Goal['values'] | undefined;
    updateGoalValue: (goalType: string, goalData: Record<keyof Goal['values'], number>) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [goals, setGoals] = useState<Goal[]>([]);

    const updateGoalValue = (goalType: string, goalData: Record<keyof Goal['values'], number>) => {
        setGoals((prev) =>
            prev.map((goal) => {
                if (goal.goalType !== goalType) return goal;
                const updatedValues = Object.entries(goal.values).reduce(
                    (acc, [key, value]) => {
                        acc[key as keyof Goal['values']] = {
                            ...value,
                            value: goalData[key as keyof Goal['values']] ?? value.value,
                        };
                        return acc;
                    },
                    {} as Goal['values']
                );
                return { ...goal, values: updatedValues };
            })
        );
    };

    const getGoal = (goalType: string) => {
        return goals.find((goal) => goal.goalType === goalType)?.values;
    };

    return <GoalContext.Provider value={{ goals, setGoals, updateGoalValue, getGoal }}>{children}</GoalContext.Provider>;
};

export const useGoals = () => {
    const context = useContext(GoalContext);
    if (context === undefined) {
        throw new Error('useGoals must be used within a GoalProvider');
    }
    return context;
};
