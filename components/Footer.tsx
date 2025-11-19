import SVG from '@/components/Svg';

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
                        <a href="/discord">
                            <SVG name="discord" tooltip={{ text: 'support discord' }} />
                        </a>
                        <a href="/shop">
                            <SVG name="shop" tooltip={{ text: 'shop orbt widgets' }} />
                        </a>
                        <a href="/resources/docs">
                            <SVG name="book" tooltip={{ text: 'developer docs' }} />
                        </a>
                        <a href="/resources/icons">
                            <SVG name="star-4" tooltip={{ text: 'icons' }} />
                        </a>
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
