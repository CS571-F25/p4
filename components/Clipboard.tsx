'use client';
import { useState } from 'react';

import SVG from '@/components/Svg';

export default function Clipboard({
    text,
    onClick,
    children,
}: {
    text?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}) {
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
    }

    let tooltipText = 'copy to clipboard';
    if (onClick) {
        tooltipText = 'paste from clipboard';
        if (copied) tooltipText = 'pasted!';
    } else if (copied) {
        tooltipText = 'copied!';
    }

    return (
        <button className="flex justify-center items-center clipboard-button" onClick={handleClick}>
            {children ?? <SVG name={copied ? 'clipboard-2' : 'clipboard-1'} tooltip={{ text: tooltipText }} />}
        </button>
    );
}
