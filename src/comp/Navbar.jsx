function Navbar() {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" button class="hover:underline text-xl cursor-pointer">
                    
                Open Meny</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><a>Home</a></li>
                    <li><a>Log in</a></li>
                    <li><a>Register new user</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;