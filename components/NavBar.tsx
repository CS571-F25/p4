'use client';
import { useState } from 'react';

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav id="navbar">
            <span id="navbar-box">
                <a href="/" className="lg-hide">
                    orbt
                </a>
                <span id="navbar-links" className={menuOpen ? 'open' : ''}>
                    <span className="navbar-block">
                        <a href="/" className="sm-hide">orbt</a>
                        <a href="/widgets">widgets</a>
                    </span>
                    <span className="navbar-block">
                        <a href="/eventsubs">eventsubs</a>
                        <a href="/connections">connections</a>
                    </span>
                </span>
                <span id="menu-toggle" className={`lg-hide ${menuOpen ? 'checked' : ''}`}>
                    <svg
                        className={`ham ham6 ${menuOpen ? 'active' : ''}`}
                        viewBox="10 10 80 80"
                        width="40"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <path
                            className="line top"
                            d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
                        />
                        <path
                            className="line middle"
                            d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
                        />
                        <path
                            className="line bottom"
                            d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
                        />
                    </svg>
                </span>
            </span>
        </nav>
    );
}
