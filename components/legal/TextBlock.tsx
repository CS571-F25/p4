export default function TextBlock({
    text,
    className,
}: {
    text: any[];
    className?: string;
}) {
    if (Array.isArray(text)) {
        return (
            <ul className={className}>
                {text.map((item, index) => (
                    <li key={index}>
                        {typeof item === "string" ? item : <TextBlock text={item} />}
                    </li>
                ))}
            </ul>
        );
    }

    return <p className={className}>{text}</p>;
}
