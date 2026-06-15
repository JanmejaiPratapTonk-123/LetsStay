function Navbar() {
    return (
        <nav>
            <div className="flex gap-4 justify-between">
                <div>
                    <h1>
                        LetsStay
                    </h1>
                </div>

                <div>
                    <ul className="flex flex-row gap-3">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                    </ul>
                </div>

                <div>
                    👤
                </div>
            </div>
        </nav>
    );
}

export default Navbar;