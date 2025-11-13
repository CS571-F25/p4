import { useState } from 'react';

import SVG from '@/components/Svg';

function ActivityDataBlock({
    data,
    isFirst,
    isCollapsed,
}: {
    data: Record<string, any>;
    isFirst?: boolean;
    isCollapsed?: boolean;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="activity-data-block">
            {!isFirst && (
                <button className="expand-button" onClick={() => setExpanded((prev) => !prev)}>
                    <SVG
                        name={expanded ? 'eye-close' : 'eye'}
                        className="expand-icon"
                        tooltip={{ text: expanded ? 'collapse' : 'expand', location: 'left' }}
                    />
                </button>
            )}
            <span className={`activity-data-content ${expanded || isCollapsed ? 'expanded' : 'collapsed'}`}>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="activity-data-item">
                        <strong>{key}: </strong>
                        {typeof value === 'object' ? (
                            <ActivityDataBlock data={value} isFirst={false} />
                        ) : (
                            <span>{value.toString()}</span>
                        )}
                    </div>
                ))}
            </span>
        </div>
    );
}

export default ActivityDataBlock;
