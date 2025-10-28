'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '@/styles/index.css';

export default function AnimatedText({ text }: { text: string }) {
    const spanRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!spanRef.current) return;

        const chars = spanRef.current.querySelectorAll('.char');

        gsap.fromTo(
            chars,
            { opacity: 0, y: -16 },
            {
                opacity: 1,
                y: 0,
                duration: 0.04,
                stagger: 0.02,
                ease: 'power2.out',
                delay: 0.4,
            }
        );
    }, [text]);

    return (
        <span ref={spanRef}>
            {text.split('').map((char, index) => (
                <span key={index} className="char inline-block" style={{ ['--char-index']: index } as React.CSSProperties}>
                    {char}
                </span>
            ))}
        </span>
    );
}
