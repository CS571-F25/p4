import icons from '@/data/icons.json';

import Tooltip from '@/components/Tooltip';

export default function Svg({
    name,
    className,
    tooltip,
}: {
    name: string;
    className?: string;
    tooltip?: Omit<React.ComponentProps<typeof Tooltip>, 'children'>;
}) {
    let icon = icons.find((icon) => icon.name === name)?.svg;

    if (!icon) icon = icons.find((icon) => icon.name === 'lost-icon')?.svg;

    if (!icon) return null;

    let svgElement = (
        <span className={`icon flex items-center justify-center w-fit h-fit ${className}`} dangerouslySetInnerHTML={{ __html: icon }} />
    );
    if (tooltip) {
        return <Tooltip {...tooltip}>{svgElement}</Tooltip>;
    }
    return svgElement;
}
