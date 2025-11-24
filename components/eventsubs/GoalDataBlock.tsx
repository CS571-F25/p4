import { useState, useEffect } from 'react';

import { Goal } from '@/types/Goal';

const formatNumber = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
}).format;

export default function GoalDataBlock({
    name,
    values,
    initialGoal,
    changed,
    onGoalChange,
    i,
}: {
    name: string;
    values: Goal['values'];
    initialGoal: number;
    onGoalChange?: (goalType: string, newGoal: number) => void;
    changed?: boolean;
    i: number;
}) {
    const [goal, setGoal] = useState(initialGoal);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        onGoalChange?.(name, Number(goal));
    }, [goal]);

    return (
        <div className="goal-block fade-in" style={{ '--index': i } as React.CSSProperties}>
            <h3>
                {name
                    .split(/(?=[A-Z])/)
                    .join(' ')
                    .toLowerCase()}
                {changed && '*'}
            </h3>
            <span className="goal-data">
                <p>{values.total.value.toLocaleString()}</p>
                <p>/</p>
                <input
                    value={isFocused ? goal : formatNumber(goal)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (isNaN(newValue)) return;
                        setGoal(newValue);
                    }}
                />
            </span>
        </div>
    );
}
