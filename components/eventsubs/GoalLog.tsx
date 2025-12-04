import { useEffect, useState } from 'react';

import providers from '@/data/providers.json';
import { useGoals } from '@/contexts/GoalContext';
import { useUser } from '@/contexts/UserContext';

import SVG from '@/components/Svg';
import GoalDataBlock from '@/components/eventsubs/GoalDataBlock';
import Spinner from '@/components/Spinner';

export default function GoalLog({ provider }: { provider: keyof typeof providers }) {
    const { user } = useUser();
    const { goals, setGoals, getGoal } = useGoals();
    const [changedGoals, setChangedGoals] = useState<Record<string, [number, number]>>({});
    const [saving, setSaving] = useState(false);

    const orbtId = user?.orbtId || '';
    const userId = user?.providers[provider] || '';

    async function fetchGoals() {
        if (!orbtId || !provider) return;
        const res = await fetch(`/api/eventsub/goals?orbtId=${orbtId}&service=${provider}`);
        const data = await res.json();
        setGoals(data);
    }

    useEffect(() => {
        fetchGoals();
    }, [orbtId, provider, setGoals]);

    function handleGoalChange(goalType: string, newGoal: number) {
        setChangedGoals((prev) => {
            const initialGoal = goals.find((g) => g.goalType === goalType)?.goal || 0;
            if (newGoal === initialGoal) {
                const { [goalType]: _, ...rest } = prev;
                return rest;
            }
            return {
                ...prev,
                [goalType]: [newGoal, initialGoal],
            };
        });
    }

    async function saveGoals() {
        if (!userId || !provider || Object.keys(changedGoals).length === 0) return;

        setSaving(true);
        try {
            const updates = Object.entries(changedGoals).map(([goalType, goal]) =>
                fetch('/api/eventsub/goals', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ service: provider, userId, goalType, goal }),
                })
            );

            await Promise.all(updates);
            setChangedGoals({});
            await fetchGoals();
        } catch (error) {
            console.error('Failed to save goals:', error);
        } finally {
            setSaving(false);
        }
    }

    function resetTestValues() {
        if (!orbtId || !provider) return;
        fetch(`/api/eventsub/goals?userId=${userId}&service=${provider}`, {
            method: 'DELETE',
        }).then(fetchGoals);
    }

    return (
        <>
            <span className="goals-header">
                <h2>manage goals</h2> <SVG name="planet" tooltip={{ text: 'goals apply to all widgets' }} />
            </span>
            <span className="goals-body">
                <span className="goals-body-block overflow-y-auto">
                    {orbtId && <Spinner loading={!goals.length} />}
                    {goals.map((goal, i) => {
                        const goalValues = getGoal(goal.goalType);
                        if (!goalValues) return null;
                        return (
                            <GoalDataBlock
                                key={i}
                                name={goal.goalType}
                                values={goalValues}
                                initialGoal={goal.goal}
                                i={i}
                                changed={changedGoals[goal.goalType] !== undefined}
                                onGoalChange={handleGoalChange}
                            />
                        );
                    })}
                </span>
                <span
                    className={`goals-body-block goals-buttons transition-opacity duration-1000 delay-1000 ${!goals.length ? 'opacity-0' : ''}`}
                >
                    <button onClick={saveGoals} disabled={saving || Object.keys(changedGoals).length === 0}>
                        {saving ? 'saving...' : 'save goals'}
                    </button>
                    <button onClick={resetTestValues}>reset test values</button>
                </span>
            </span>
        </>
    );
}
