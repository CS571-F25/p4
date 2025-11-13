import SVG from '@/components/Svg';

export default function Footer() {
    return (
        <footer id="footer">
            <div id="footer-box">
                <span id="footer-info" className="footer-block">
                    <h3>orbt</h3>
                    <p>
                        <span className="abn-sym">©</span> {new Date().getFullYear()} BradyDaLlama.
                    </p>
                </span>
                <span id="footer-links" className="footer-block">
                    <a href="/discord">
                        <SVG name="discord" tooltip={{ text: 'support discord' }} />
                    </a>
                    <a href="/shop">
                        <SVG name="shop" tooltip={{ text: 'shop orbt widgets' }} />
                    </a>
                    <a href="/docs">
                        <SVG name="book" tooltip={{ text: 'developer docs' }} />
                    </a>
                    <a href="/legal/terms">terms</a>
                    <a href="/legal/privacy">privacy policy</a>
                </span>
            </div>
        </footer>
    );
}