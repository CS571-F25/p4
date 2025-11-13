import '@/styles/index.css';

import AnimatedText from '@/components/AnimatedText';
import Feature from '@/components/index/Feature';

const features = [
    {
        title: 'multi-platform support',
        description: 'orbt widgets support events from multiple platforms like Twitch, YouTube, and more.',
        imgSrc: 'https://i.etsystatic.com/17233766/r/il/a8c546/6959385544/il_1588xN.6959385544_p8sv.jpg',
    },
    {
        title: 'feature rich',
        description: 'orbt widgets support a wide range of events and can be easily customized to fit your needs.',
        imgSrc: 'https://i.etsystatic.com/17233766/r/il/a8c546/6959385544/il_1588xN.6959385544_p8sv.jpg',
    },
    {
        title: 'consistent settings',
        description: 'orbt widgets allow for consistent themes and goals that can easily be updated across all widgets.',
        imgSrc: 'https://i.etsystatic.com/17233766/r/il/a8c546/6959385544/il_1588xN.6959385544_p8sv.jpg',
    }
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
