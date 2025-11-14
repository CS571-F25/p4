import { useState } from 'react';
import '@/styles/eventsubsProvider.css';

import providers from '@/data/providers.json';

import SVG from '@/components/Svg';
import Clipboard from '@/components/Clipboard';
import OrbtId from '@/components/OrbtId';

import TextBubble from '@/components/TextBubble';
import EventButton from '@/components/eventsubs/EventButton';
import ActivityLog from '@/components/eventsubs/ActivityLog';

export default function ProviderEventsubs({ provider }: { provider: keyof typeof providers }) {
    const [widgetPreview, setWidgetPreview] = useState('');
    const [openModal, setOpenModal] = useState('');

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
                <div
                    id="test-events"
                    className={`eventsubs-provider-box modal ${openModal === 'test-events' ? 'open' : ''}`}
                    onClick={() => changeModal('')}
                    tabIndex={0}
                >
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
                            />
                        ))}
                    </div>
                </div>
                <div
                    id="goals"
                    className={`eventsubs-provider-box modal ${openModal === 'goals' ? 'open' : ''}`}
                    onClick={() => changeModal('')}
                    tabIndex={0}
                >
                    <span>
                        <h2>manage goals</h2>
                        <p>goals apply to all widgets</p>
                    </span>
                </div>
            </div>
            <div id="widget-preview" className="eventsubs-provider-box" onClick={() => changeModal('')} tabIndex={0}>
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
                        <SVG name="mark-x" tooltip={{ text: 'Clear' }} />
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
                <ActivityLog provider={provider} />
            </div>
        </div>
    );
}
