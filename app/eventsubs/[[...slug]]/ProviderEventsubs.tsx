import { useState, useEffect } from 'react';
import '@/styles/eventsubsProvider.css';

import providers from '@/data/providers.json';

import { Goal } from '@/types/Goal';

import SVG from '@/components/Svg';
import Clipboard from '@/components/Clipboard';
import OrbtId from '@/components/OrbtId';

import TextBubble from '@/components/TextBubble';
import EventButton from '@/components/eventsubs/EventButton';
import ActivityLog from '@/components/eventsubs/ActivityLog';
import GoalBlock from '@/components/eventsubs/GoalBlock';
import Spinner from '@/components/Spinner';
import DataFormModal from '@/components/eventsubs/DataFormModal';

export default function ProviderEventsubs({ provider }: { provider: keyof typeof providers }) {
    const [orbtId, setOrbtId] = useState('');
    const [goals, setGoals] = useState<Record<string, { value: number; goal: number }>>({});
    const [widgetPreview, setWidgetPreview] = useState('');
    const [openModal, setOpenModal] = useState('');
    const [testData, setTestData] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        fetch('/api/user?provider=orbtId')
            .then((res) => res.json())
            .then((data) => {
                if (!data.userId) return;
                setOrbtId(data.userId);
            });
    }, []);

    useEffect(() => {
        if (!orbtId || !provider) return;
        fetch(`/api/eventsub/goals?orbtId=${orbtId}&service=${provider}`)
            .then((res) => res.json())
            .then((data) => {
                const goals: Record<string, { value: number; goal: number }> = {};
                data.forEach((goal: Goal) => {
                    goals[goal.goalType] = { value: goal.values.total.value, goal: 100 };
                });
                setGoals(goals);
            });
    }, [orbtId, provider]);

    useEffect(() => {
        if (!testData) return setOpenModal('');
        setOpenModal('test-event-data');
    }, [testData]);

    function pastePreview() {
        navigator.clipboard.readText().then((text) => {
            setWidgetPreview(text);
        });
    }

    function changeModal(modal: string) {
        if (openModal === modal) setOpenModal('');
        else setOpenModal(modal);
    }

    return (
        <div id="provider-eventsubs">
            <span className="mobile-only mobile-buttons">
                <button onClick={() => changeModal('test-events')}>
                    <SVG name="gear-1" tooltip={{ text: 'test events', location: 'right' }} />
                </button>
                <button onClick={() => changeModal('goals')}>
                    <SVG name="medal-2" tooltip={{ text: 'goals', location: 'right' }} />
                </button>
                <button onClick={() => changeModal('activity-log')}>
                    <SVG name="message-2" tooltip={{ text: 'activity log', location: 'right' }} />
                </button>
                <button onClick={() => changeModal('orbt-id')}>
                    <SVG name="star" tooltip={{ text: 'view orbtId', location: 'right' }} />
                </button>
            </span>
            <div id="goals-test-events" className="eventsubs-provider-container">
                {testData && (
                    <DataFormModal
                        testData={testData}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        setTestData={setTestData}
                        userId={orbtId}
                    />
                )}
                <div id="test-events" className={`eventsubs-provider-box modal ${openModal === 'test-events' ? 'open' : ''}`}>
                    <TextBubble>{provider}: test events</TextBubble>
                    <div id="test-event-buttons">
                        {Object.entries(providers?.[provider]?.eventsub)?.map(([name, event], i) => (
                            <EventButton
                                key={i}
                                provider={provider}
                                name={
                                    event?.event
                                        .split(/(?=[A-Z])/)
                                        .join(' ')
                                        .toLowerCase() || name
                                }
                                event={name}
                                userId={orbtId}
                                onClick={() => setOpenModal('')}
                                setTestData={setTestData}
                            />
                        ))}
                    </div>
                </div>
                <div id="goals" className={`eventsubs-provider-box modal ${openModal === 'goals' ? 'open' : ''}`}>
                    <span className="goals-header">
                        <h2>manage goals</h2>
                        <p>goals apply to all widgets</p>
                    </span>
                    <span className="goals-body">
                        <Spinner loading={!Object.entries(goals).length} />
                        {Object.entries(goals).map(([name, { value, goal }], i) => (
                            <GoalBlock key={i} name={name} value={value} goal={goal} i={i} />
                        ))}
                    </span>
                </div>
            </div>
            <div id="widget-preview" className="eventsubs-provider-box">
                <div id="widget-preview-input-box">
                    <input
                        id="widget-preview-input"
                        type="text"
                        placeholder="Widget Preview URL"
                        aria-label="Widget Preview URL"
                        value={widgetPreview}
                        disabled
                    />
                    <Clipboard onClick={pastePreview} />
                    <button className="flex justify-center items-center" onClick={() => setWidgetPreview('')}>
                        <SVG name="mark-x" tooltip={{ text: 'clear' }} />
                    </button>
                </div>
                {widgetPreview && <iframe src={widgetPreview} title="Widget Preview" />}
                <div
                    id="orbt-id-modal"
                    className={`flex align-center !justify-center modal ${openModal === 'orbt-id' ? 'open eventsubs-provider-box ' : ''}`}
                >
                    <OrbtId color="light" compact={true} />
                </div>
            </div>
            <div id="activity" className={`eventsubs-provider-box modal ${openModal === 'activity-log' ? 'open' : ''}`}>
                <ActivityLog />
            </div>
        </div>
    );
}
