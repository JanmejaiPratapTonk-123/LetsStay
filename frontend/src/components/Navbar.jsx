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
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Login</a></li>
                        <li><a href="">Dashboard</a></li>
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