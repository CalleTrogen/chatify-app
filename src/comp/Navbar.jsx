import { NavLink } from "react-router-dom";

function Navbar() {

    return (
        <div className="drawer h-screen">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page innehåll*/}
                <label htmlFor="my-drawer" className="hover:underline text-xl">Open Menu</label>
            </div>
            <div className="drawer-side h-screen">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <nav className="flex flex-col h-full">
                    <ul className="menu bg-base-200 text-base-content flex-grow w-80 p-4">
                        {/* Sidebar innehåll */}
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/Login'>Log in</NavLink></li>
                        <li><NavLink to='/Register'>Register User</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;