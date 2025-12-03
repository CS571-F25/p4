import '@/styles/index.css';

import AnimatedText from '@/components/AnimatedText';
import Feature from '@/components/index/Feature';

const features = [
    {
        title: 'multi-platform support',
        description: 'orbt widgets support combined events from multiple platforms like Twitch, YouTube, and more.',
        imgSrc: '/images/f1.png',
    },
    {
        title: 'smart features',
        description:
            'orbt includes many helpful features like chatbot interactions, intuitive tools for testing and managing widgets, and customization options.',
        imgSrc: '/images/f2.png',
    },
    {
        title: 'consistent settings',
        description: 'orbt widgets allow for consistent themes and goals that can easily be updated across all widgets.',
        imgSrc: '/images/f3.png',
    },
];

export default function Orbt() {
    return (
        <div id="orbt-page">
            <span id="orbt-header">
                <AnimatedText text="unique, versatile, simple." className="orbt-subheader" />
                <h2>flexible content widgets that do more.</h2>
            </span>
            <div id="feature-box">
                {features.map((feature, i) => (
                    <Feature key={i} {...feature} i={i} />
                ))}
            </div>
        </div>
    );
}
