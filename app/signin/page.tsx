import '@/styles/providers.css';

import providers from '@/data/providers.json';
import ProviderButton from '@/components/main/ProviderButton';

export default function SignIn() {
    return (
        <div id="provider-container">
            <h1>widget.star integrations</h1>
            <p>include events & data from popular services</p>
            <div id="provider-button-container">
                {Object.entries(providers).map(([provider, { color }], i) => (
                    <ProviderButton key={i} provider={provider} color={color} />
                ))}
            </div>
        </div>
    );
}
