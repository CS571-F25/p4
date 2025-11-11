

export default function NavBar() {
    return (
        <nav id="navbar">
            <span className="navbar-box">
                <span className="navbar-block">
                    <a href="/">orbt</a>
                    <a href="/widgets">widgets</a>
                </span>
                <span className="navbar-block">
                    <a href="/eventsubs">eventsubs</a>
                    <a href="/connections">connections</a>
                </span>
            </span>
        </nav>
    );
}