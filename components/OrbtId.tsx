'use client';
import { useState, useEffect } from 'react';

import { useUser } from '@/contexts/UserContext';
import Clipboard from '@/components/Clipboard';
import SVG from '@/components/Svg';

export default function OrbtId({ color = 'dark', compact = false }: { color?: 'dark' | 'light'; compact?: boolean }) {
    const { user, loading } = useUser();
    const [hidden, setHidden] = useState<boolean | null>(null);

    const orbtId = loading ? 'loading...' : user?.orbtId || 'not connected';

    useEffect(() => {
        if (user?.orbtId) {
            setHidden(true);
        }
    }, [user]);

    function showOrbtId() {
        if (hidden === null) return;
        if (!hidden) return setHidden(true);
        setHidden(false);
        setTimeout(() => setHidden(true), 3000);
    }

    return (
        <span className={`orbt-id-container ${color} ${compact ? 'compact' : ''}`}>
            <div className="orbt-id-box shadow">
                orbt ID:
                <span className={`orbt-id ${hidden ? 'hide' : ''}`}>{hidden ? '●'.repeat(orbtId.length) : orbtId}</span>
                <Clipboard text={orbtId} />
                <button id="orbt-id-toggle" className="flex justify-center items-center" onClick={showOrbtId}>
                    <SVG name={hidden ? 'eye' : 'eye-close'} tooltip={{ text: hidden ? 'show' : 'hide' }} />
                </button>
            </div>
            <p>
                do not share this user ID. it allows widgets to connect to your orbt profile, and sharing it will allow other
                users’ widgets to process your event data.
            </p>
        </span>
    );
}
