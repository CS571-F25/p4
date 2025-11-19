import { useState } from 'react';
import SVG from '@/components/Svg';

export default function Spinner({ loading, className = '' }: { loading: boolean; className?: string }) {
    const [shouldCollapse, setShouldCollapse] = useState(false);

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        // Only handle opacity transitions
        if (e.propertyName === 'opacity' && !loading) {
            setShouldCollapse(true);
        }
        // Hide completely after all transitions
        if (shouldCollapse && e.propertyName === 'height') {
            e.currentTarget.style.display = 'none';
        }
        // Show when loading starts
        if (loading) {
            e.currentTarget.style.display = 'flex';
            setShouldCollapse(false);
        }
    };

    return (
        <div
            className={`relative w-8 overflow-visible ${
                loading
                    ? 'h-8 p-4 m-2 max-h-20 opacity-100 transition-all duration-1000'
                    : shouldCollapse
                      ? 'h-0 p-0 m-0 max-h-0 opacity-0 transition-all duration-500'
                      : 'h-8 p-4 m-2 max-h-20 opacity-0 transition-opacity duration-500'
            } text-bg-dark ${className}`}
            onTransitionEnd={handleTransitionEnd}
        >
            <SVG
                name="star-4"
                className="spinner-svg absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 [&>svg]:animate-[spin_2s_linear_infinite]"
            />
        </div>
    );
}
