import React from 'react';
import { Link, useLocation} from 'react-router-dom';

function NavLink({ to, children }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className={isActive ? 'active' : ''}>
            <Link to={to}>{children}</Link>
        </li>
    );
}
export default NavLink;