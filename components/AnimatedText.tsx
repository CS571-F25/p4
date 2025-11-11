'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '@/styles/index.css';

export default function AnimatedText({
    text,
    className,
    from,
    to,
}: {
    text: string;
    className?: string;
    from?: {
        opacity?: number;
        y?: number;
        scale?: number;
    };
    to?: {
        opacity?: number;
        y?: number;
        scale?: number;
        duration?: number;
        stagger?: number;
        ease?: string;
        delay?: number;
    };
}) {
    const spanRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!spanRef.current) return;

        const chars = spanRef.current.querySelectorAll('.char');

        gsap.fromTo(
            chars,
            { opacity: 0, y: -16, ...from },
            {
                opacity: 1,
                y: 0,
                duration: 0.04,
                stagger: 0.02,
                ease: 'power2.out',
                delay: 0.4,
                ...to,
            }
        );
    }, [text]);

    return (
        <span ref={spanRef} className={className}>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="char inline-block opacity-0"
                    style={{ ['--char-index']: index } as React.CSSProperties}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
}
