'use client';
import { useState } from 'react';

import SVG from '@/components/Svg';

export default function Clipboard({ text, onClick }: { text?: string; onClick?: () => void }) {
    const [copied, setCopied] = useState(false);

    function doCopy() {
        if (copied) return;
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }

    function handleClick() {
        if (text) {
            navigator.clipboard.writeText(text);
        }
        if (onClick) {
            onClick();
        }
        doCopy();
    };

    return (
        <button className="clipboard-button" onClick={handleClick}>
            <SVG name={copied ? 'clipboard-2' : 'clipboard-1'} />
        </button>
    );
}
