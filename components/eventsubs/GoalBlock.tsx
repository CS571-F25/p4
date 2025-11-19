import { useState } from 'react';

export default function GoalBlock({ name, value, goal, i }: { name: string; value: number; goal: number; i: number }) {
    const [charLength, setCharLength] = useState(goal.toString().length);

    return (
        <div className="goal-block fade-in" style={{ '--index': i } as React.CSSProperties}>
            <h3>
                {name
                    .split(/(?=[A-Z])/)
                    .join(' ')
                    .toLowerCase()}
            </h3>
            <span className="goal-data">
                <p>{value}</p>
                <p>/</p>
                <input type="number" value={goal} readOnly style={{ '--char-length': charLength } as React.CSSProperties} />
            </span>
        </div>
    );
}
