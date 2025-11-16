import SVG from '@/components/Svg';

export default function Spinner({ loading }: { loading: boolean }) {
    return (
        <div
            className={`relative transition-all w-8 overflow-visible ${loading ? 'h-8 p-4 m-2 max-h-20' : 'h-0 p-0 m-0a opacity-0 max-h-0'} duration-1000`}
            onTransitionEnd={(e) => (e.currentTarget.style.display = loading ? 'flex' : 'none')}
        >
            <SVG
                name="star-4"
                className="spinner-svg absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-bg-dark [&>svg]:animate-[spin_2s_linear_infinite]"
            />
        </div>
    );
}
