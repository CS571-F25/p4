import icons from '@/data/icons.json';

function rmSymb(str: string) {
    return str?.replace(/[<>/]/g, '').trim();
}

export default function Svg({ name, className }: { name: string; className?: string }) {
    let icon = icons.find((icon) => icon.name === name)?.svg;

    if (!icon) icon = icons.find((icon) => icon.name === 'lost-icon')?.svg;

    if (!icon) return null;

    const iconProps = Object.assign(
        icon.split("'").flatMap((part, index, arr) => {
            // ignore if part starts with / or > using regex
            if (index % 2 === 0) return [];
            return [`${rmSymb(arr[index - 1])}${rmSymb(part)}`];
        }).slice(1).reduce((acc, curr) => {
            let [key, value] = curr.split('=');
            key = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            acc[key] = value.replace(/"/g, '');
            return acc;
        }, {} as { [key: string]: string })
    );

    return <svg {...iconProps}></svg>;
}
