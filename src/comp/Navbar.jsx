import { NavLink } from "react-router-dom";
import Register from "./Register";

function Navbar() {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" button className="hover:underline text-xl">Open Menu</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <nav>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><a>Log in</a></li>
                        <li><NavLink to='/Register'>Register User</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;