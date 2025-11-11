import { useState } from 'react';
import '@/styles/eventsubsProvider.css';

import providers from '@/data/providers.json';

import TextBubble from '@/components/TextBubble';
import EventButton from '@/components/eventsubs/EventButton';
import SVG from '@/components/Svg';
import Clipboard from '@/components/Clipboard';
import OrbtId from '@/components/OrbtId';

export default function ProviderEventsubs({ provider }: { provider: keyof typeof providers }) {
    const [widgetPreview, setWidgetPreview] = useState('');

    function pastePreview() {
        navigator.clipboard.readText().then((text) => {
            setWidgetPreview(text);
        });
    }

    return (
        <div id="provider-eventsubs">
            <div id="goals-test-events" className="eventsubs-provider-container">
                <div id="test-events" className="eventsubs-provider-box">
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
                            />
                        ))}
                    </div>
                </div>
                <div id="goals" className="eventsubs-provider-box">
                    <h2>manage Goals</h2>
                    <p>goals apply to all widgets</p>
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
                    <button onClick={() => setWidgetPreview('')}>
                        <SVG name="mark-x" />
                    </button>
                </div>
                {widgetPreview && <iframe src={widgetPreview} title="Widget Preview" />}
                <OrbtId color="light" compact={true} />
            </div>
            <div id="activity" className="eventsubs-provider-box">
                <TextBubble>activity log</TextBubble>
            </div>
        </div>
    );
}