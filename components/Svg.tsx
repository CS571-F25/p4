import icons from '@/data/icons.json';

function rmSymb(str: string) {
    return str?.replace(/[<>/]/g, '').trim();
}

export default function Svg({ name, className }: { name: string; className?: string }) {
    let icon = icons.find((icon) => icon.name === name)?.svg;

    if (!icon) icon = icons.find((icon) => icon.name === 'lost-icon')?.svg;

    if (!icon) return null;

    return (
        <span
            className={`icon ${className}`}
            dangerouslySetInnerHTML={{ __html: icon }}
        />
    );
}
