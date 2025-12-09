import { useState, useEffect, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';

import SVG from '@/components/Svg';
import DataForm from '@/components/eventsubs/DataForm';

export default function DataFormModal({
    testData,
    openModal,
    setOpenModal,
    setTestData,
}: {
    testData: Record<string, any>;
    openModal: string;
    setOpenModal: (modal: string) => void;
    setTestData: (data: Record<string, any> | null) => void;
}) {
    const { user } = useUser();
    const userId = user?.orbtId ?? '';

    const { data, service, subscription, event } = testData;
    const [currentData, setCurrentData] = useState(testData.data);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openModal === 'test-event-data' && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll<HTMLElement>('[tabindex]:not([tabindex="-1"])');
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }, [openModal]);

    function submitData() {
        fetch('/api/eventsub/test', {
            method: 'POST',
            body: JSON.stringify({
                service: service,
                subscriptionType: event,
                userId,
                data: currentData,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setTestData(null);
            setOpenModal('');
        });
    }

    function closeModal() {
        setTestData(null);
        setOpenModal('');
    }

    return (
        <div
            ref={modalRef}
            id="test-data"
            className={`eventsubs-provider-box shadow modal ${openModal === 'test-event-data' ? 'open' : ''}`}
        >
            <h2>
                <span>
                    <SVG name={service} tooltip={{ text: `service: ${service}`, location: 'right' }} />
                    <SVG name="gear-1" tooltip={{ text: 'editing test event data', location: 'right' }} />
                </span>
                {subscription}
            </h2>
            <DataForm key={JSON.stringify(testData)} initialData={data} onChange={setCurrentData} />
            <span className="modal-buttons flex items-center justify-between gap-4 w-[80%] text-xs [&>button]:border-2 [&>button]:border-[var(--primary-color)] [&>button]:rounded-full [&>button]:px-4 [&>button]:py-1">
                <button onClick={submitData} className="primary-button">
                    submit
                </button>
                <button onClick={closeModal} className="secondary-button">
                    cancel
                </button>
            </span>
        </div>
    );
}
