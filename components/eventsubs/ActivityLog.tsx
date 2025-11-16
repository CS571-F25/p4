import { useState, useEffect } from 'react';

import providers from '@/data/providers.json';

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
    const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
    const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

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
        fetch('/api/user?provider=orbtId')
            .then((res) => res.json())
            .then((data) => {
                if (!data.userId) return;

                const es = new EventSource(`/api/eventsub/connect?userId=${data.userId}`);

                es.onmessage = (event) => {
                    const parsedData = JSON.parse(event.data);
                    const id = `${Date.now()}-${Math.random()}`;
                    setActivityLog((prev) => [{ ...parsedData, id, timestamp: Date.now() }, ...prev]);
                };
            });
    }, []);

    return (
        <>
            <TextBubble>activity log</TextBubble>
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
