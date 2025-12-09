'use client';
import { useState } from 'react';

import '@/styles/icons.css';
import iconData from '@/data/icons.json';
const icons = iconData
    .filter((value) => !value.isSpecial)
    .map((value) => ({
        name: value.name,
        tags: value.tags,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

import Tooltip from '@/components/Tooltip';
import SVG from '@/components/Svg';
import Clipboard from '@/components/Clipboard';

function IconCard({ name, tags, matches }: { name: string; tags: string[]; matches: boolean }) {
    const [copied, setCopied] = useState(false);

    function copyToClipboard() {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function cardWrapper(children: React.ReactNode) {
        return <span className={!matches ? 'hidden' : ''}>{children}</span>;
    }

    let baseContent = (
        <Tooltip key={name} text={name}>
            <Clipboard text={name} onClick={copyToClipboard}>
                <div key={name} className="icon-item shadow card relative">
                    <SVG
                        name={name}
                        className={`icon transition-[opacity_scale] ${copied ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                    />
                    <SVG
                        name="clipboard-2"
                        className={`icon transition-[opacity_scale] absolute ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                        aria-hidden="true"
                    />
                </div>
            </Clipboard>
        </Tooltip>
    );

    if (tags.length === 0) return cardWrapper(baseContent);
    return cardWrapper(
        <Tooltip key={name} text={`${tags.map((t) => `[${t}]`).join(', ')}`} location="bottom">
            {baseContent}
        </Tooltip>
    );
}

export default function IconsPage() {
    const [search, setSearch] = useState('');

    const filteredIcons = icons.filter(iconMatchesSearch);

    function iconMatchesSearch(icon: { name: string; tags: string[] }) {
        return icon.name.includes(search) || icon.tags.some((tag) => tag.includes(search));
    }

    return (
        <div id="icons-page">
            <header>
                <h2 className="text-2xl font-bold mb-4">icons ({filteredIcons.length})</h2>
                <p>
                    These are the icons available for widgets that support use of icons. Click an icon to copy its exact name to
                    your clipboard for use.
                </p>
                <span className="flex w-full items-center justify-center gap-2">
                    <input
                        type="text"
                        placeholder="search icons or tags"
                        aria-label="search icons or tags"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="flex items-center" onClick={() => setSearch('')}>
                        <SVG name="mark-x" tooltip={{ text: 'clear search', location: 'left' }} />
                    </button>
                </span>
            </header>
            <div id="icons-grid">
                {icons.map((icon, i) => (
                    <IconCard key={i} {...icon} matches={iconMatchesSearch(icon)} />
                ))}
            </div>
        </div>
    );
}
