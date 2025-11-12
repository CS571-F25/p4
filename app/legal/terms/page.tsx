import '@/styles/legal.css';

import termsData from '@/data/terms.json';

import TextBlock from '@/components/legal/TextBlock';

export default function Terms() {
    return (
        <div id="terms-page" className="legal-page">
            <h1>Terms of Service</h1>
            <div id="sections-box">
                {Object.entries(termsData).map(([section, content], index) => (
                    <div key={index} className="legal-section">
                        <h2>{section}</h2>
                        <TextBlock text={content} />
                    </div>
                ))}
            </div>
        </div>
    );
}
