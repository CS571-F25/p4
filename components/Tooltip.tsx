'use client';
import { useState } from 'react';

const locations = {
    top: 'top-0 left-[50%] translate-y-[-100%] translate-x-[-50%]',
    left: 'top-[50%] right-[100%] translate-y-[-50%] translate-x-[-0.5rem]',
    right: 'top-[50%] left-[100%] translate-y-[-50%] translate-x-[0.5rem]',
    bottom: 'top-full left-[50%] translate-x-[-50%]',
};

export default function Tooltip({
    text,
    children,
    location = 'top',
}: {
    text: string;
    children: React.ReactNode;
    location?: keyof typeof locations;
}) {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative inline-block overflow-visible"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            onClick={() => setVisible(false)}
            role="button"
        >
            {children}
            <div
                className={`tooltip shadow border-bg-dark border-2 bg-primary text-bg-dark text-xxs px-3 py-0.5 rounded-full z-10 absolute ${locations[location]} whitespace-nowrap transition-opacity ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {text}
            </div>
        </div>
    );
}
