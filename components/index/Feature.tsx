export default function Feature({
    i,
    title,
    description,
    imgSrc,
}: {
    i: number;
    title: string;
    description: string;
    imgSrc: string;
}) {
    return (
        <div className="feature" style={{ '--feature-index': i } as React.CSSProperties} tabIndex={0}>
            <h3>{title}</h3>
            <div className="feature-card">
                <div className="feature-card-inner">
                    <div className="feature-card-front shadow card">
                        <img src={imgSrc} alt={title} />
                    </div>
                    <div className="feature-card-back shadow card">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
