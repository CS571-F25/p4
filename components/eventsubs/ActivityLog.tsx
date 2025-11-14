import { useState, useEffect } from 'react';

import providers from '@/data/providers.json';

import TextBubble from '@/components/TextBubble';
import Tooltip from '@/components/Tooltip';
import SVG from '@/components/Svg';
import ActivityDataBlock from '@/components/eventsubs/ActivityDataBlock';

interface ActivityLogEntry {
    service: string;
    subscription: string;
    mock?: boolean;
    timestamp: number;
    data: any;
}

export default function ActivityLog({ provider }: { provider: keyof typeof providers }) {
    const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
    const [collapsed, setCollapsed] = useState<boolean[]>([]);

    const toggleCollapsed = (e: React.MouseEvent | React.KeyboardEvent, index: number) => {
        if ((e.target as HTMLElement).closest('button')) return;
        setCollapsed((prev) => {
            const newCollapsed = [...prev];
            newCollapsed[index] = !newCollapsed[index];
            return newCollapsed;
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (!(e.target as HTMLElement).closest('button')) {
                e.preventDefault();
                toggleCollapsed(e, index);
            }
        }
    };

    useEffect(() => {
        fetch('/api/user?provider=orbtId')
            .then((res) => res.json())
            .then((data) => {
                if (!data.userId) return;

                const es = new EventSource(`/api/eventsub/connect?userId=${data.userId}`);

                es.onmessage = (event) => {
                    const parsedData = JSON.parse(event.data);
                    if (parsedData.service === provider) {
                        setActivityLog((prev) => [{ ...parsedData, timestamp: Date.now() }, ...prev]);
                        setCollapsed((prev) => [false, ...prev]);
                    }
                };
            });
    }, []);

    return (
        <>
            <TextBubble>activity log</TextBubble>
            <ul id="activity-log">
                {activityLog.map((entry, index) => (
                    <li
                        key={index}
                        className="activity-log-entry shadow"
                        onClick={(e) => toggleCollapsed(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        tabIndex={0}
                        role="menuitem"
                        aria-expanded={!collapsed[index]}
                    >
                        <span className="activity-log-entry-header">
                            <SVG name={entry.service} tooltip={{ text: `service: ${entry.service}`, location: 'right' }} />
                            {entry.mock && <SVG name="gear-1" tooltip={{ text: 'this is a mock event', location: 'right' }} />}
                            <p>
                                {entry.subscription
                                    .replace(/([A-Z])/g, ' $1')
                                    .trim()
                                    .toLowerCase()}
                            </p>
                            <time className="activity-log-timestamp">
                                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </time>
                        </span>
                        <ActivityDataBlock data={entry.data} isFirst={true} isCollapsed={collapsed[index]} />
                    </li>
                ))}
            </ul>
        </>
    );
}
