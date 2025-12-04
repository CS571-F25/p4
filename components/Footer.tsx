import SVG from '@/components/Svg';
import Tooltip from '@/components/Tooltip';

const links = [
    { href: '/discord', icon: 'discord', tooltip: 'support discord' },
    { href: '/shop', icon: 'shop', tooltip: 'shop orbt widgets' },
    { href: '/resources/docs', icon: 'book', tooltip: 'developer docs' },
    { href: '/resources/icons', icon: 'star-4', tooltip: 'icons' },
];

export default function Footer() {
    return (
        <footer id="footer">
            <div id="footer-box">
                <span id="footer-info" className="footer-block">
                    <h3>
                        <SVG name="star" />
                        orbt
                    </h3>
                    <p>
                        <span className="abn-sym">©</span> {new Date().getFullYear()} BradyDaLlama.
                    </p>
                </span>
                <span id="footer-links" className="footer-block">
                    <span className="link-box">
                        {links.map(({ href, icon, tooltip }) => (
                            <Tooltip key={href} text={tooltip} location="top" href={href}>
                                <a href={href}>
                                    <SVG name={icon} />
                                </a>
                            </Tooltip>
                        ))}
                    </span>
                    <span className="link-box">
                        <a href="/legal/terms">terms</a>
                        <a href="/legal/privacy">privacy policy</a>
                    </span>
                </span>
            </div>
        </footer>
    );
}
