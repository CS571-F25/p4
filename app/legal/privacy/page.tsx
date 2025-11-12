import '@/styles/legal.css';

import privacyData from '@/data/privacy.json';

import TextBlock from '@/components/legal/TextBlock';

export default function Privacy() {
    return (
        <div id="privacy-page" className="legal-page">
            <h1>Privacy Policy</h1>
            <div id="sections-box">
                {Object.entries(privacyData).map(([section, content], index) => (
                    <div key={index} className="legal-section">
                        <h2>{section}</h2>
                        <TextBlock text={content} />
                    </div>
                ))}
            </div>
        </div>
    );
}
