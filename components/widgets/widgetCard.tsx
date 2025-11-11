export default function WidgetCard({ name, image, link }: { name: string; image: string; link: string }) {
    return (
        <a href={link} className="widget-card shadow card" target="_blank" rel="noopener noreferrer">
            <img src={image} alt={name} />
        </a>
    );
}