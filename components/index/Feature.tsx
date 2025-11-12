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
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        <div className="feature" style={{ '--feature-index': i } as React.CSSProperties} tabIndex={0} role="button">
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
