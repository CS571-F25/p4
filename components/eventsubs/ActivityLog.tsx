import { useState, useEffect, useRef } from 'react';

import providers from '@/data/providers.json';
import { Goal } from '@/types/Goal';
import { useGoals } from '@/contexts/GoalContext';
import { useUser } from '@/contexts/UserContext';

import TextBubble from '@/components/TextBubble';
import SVG from '@/components/Svg';
import ActivityDataBlock from '@/components/eventsubs/ActivityDataBlock';

interface ActivityLogEntry {
    id: string;
    service: string;
    subscription: string;
    mock?: boolean;
    timestamp: number;
    data: any;
}

export default function ActivityLog() {
    const { user } = useUser();
    const { updateGoalValue } = useGoals();
    const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
    const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
    const eventSourceRef = useRef<EventSource | null>(null);

    const toggleCollapsed = (e: React.MouseEvent | React.KeyboardEvent, id: string) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setCollapsed((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (!(e.target as HTMLElement).closest('button')) {
                e.preventDefault();
                toggleCollapsed(e, id);
            }
        }
    };

    useEffect(() => {
        if (eventSourceRef.current || !user?.orbtId) return;

        const es = new EventSource(`/api/eventsub/connect?userId=${user.orbtId}`);
        eventSourceRef.current = es;

        es.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            const goals = parsedData.data.goals as Record<string, Record<keyof Goal['values'], number>>;
            const id = `${Date.now()}-${Math.random()}`;
            setActivityLog((prev) => [{ ...parsedData, id, timestamp: Date.now() }, ...prev]);

            if (!goals) return;
            Object.entries(goals).forEach(([goalType, goalData]) => {
                updateGoalValue(goalType, goalData);
            });
        };

        es.onerror = () => {
            console.error('EventSource connection error');
        };

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        };
    }, [user?.orbtId]);

    return (
        <>
            <TextBubble>
                <h2>activity log</h2>
                <span className="flex row gap-2">
                    <button
                        className="flex row items-center justify-center"
                        onClick={() =>
                            setCollapsed(() => {
                                const newCollapsed: { [key: string]: boolean } = {};
                                activityLog.forEach((entry) => (newCollapsed[entry.id] = false));
                                return newCollapsed;
                            })
                        }
                    >
                        <SVG
                            name="eye-close"
                            className="[&>svg]:h-[var(--text-xs)] [&>svg]:w-[var(--text-xs)]"
                            tooltip={{ text: 'collapse all entries', location: 'left' }}
                        />
                    </button>
                    <button
                        className="flex row items-center justify-center"
                        onClick={() => {
                            setCollapsed({});
                            setActivityLog([]);
                        }}
                    >
                        <SVG
                            name="mark-x"
                            className="[&>svg]:h-[var(--text-xs)] [&>svg]:w-[var(--text-xs)]"
                            tooltip={{ text: 'clear all entries', location: 'left' }}
                        />
                    </button>
                </span>
            </TextBubble>
            <ul id="activity-log">
                {activityLog.map(({ id, service, mock, subscription, timestamp, data }) => (
                    <li
                        key={id}
                        className="activity-log-entry shadow"
                        onClick={(e) => toggleCollapsed(e, id)}
                        onKeyDown={(e) => handleKeyDown(e, id)}
                        tabIndex={0}
                        role="menuitem"
                        aria-expanded={!collapsed[id]}
                    >
                        <span className="activity-log-entry-header">
                            <span className="flex items-center gap-2">
                                <SVG
                                    name={service === 'orbt' ? 'star' : service}
                                    tooltip={{ text: `service: ${service}`, location: 'right' }}
                                />
                                {mock && <SVG name="gear-1" tooltip={{ text: 'this is a mock event', location: 'right' }} />}
                                <p>
                                    {subscription
                                        .replace(/([A-Z])/g, ' $1')
                                        .trim()
                                        .toLowerCase()}
                                </p>
                            </span>
                            <time className="activity-log-timestamp">
                                {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </time>
                        </span>
                        <ActivityDataBlock data={data} isFirst={true} isCollapsed={collapsed[id]} />
                    </li>
                ))}
            </ul>
        </>
    );
}
