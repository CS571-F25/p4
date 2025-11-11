import '@/styles/widgets.css';
import widgets from '@/data/widgets.json';

import WidgetCard from '@/components/widgets/widgetCard';

export default function Widgets() {
    return (
        <span id="widgets">
            <p>These widgets support orbt integrations</p>
            <div className="widgets-box">
                {widgets.map((widget) => (
                    <WidgetCard key={widget.name} {...widget} />
                ))}
            </div>
        </span>
    );
}