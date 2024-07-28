import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import NavLink from './NavLink';

function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setIsLoggedIn(!!token);

        const handleLoginStatusChange = () => {
            const token = localStorage.getItem('jwtToken');
            setIsLoggedIn(!!token);
        };

        window.addEventListener('loginStatusChanged', handleLoginStatusChange);

        return () => {
            window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/data">Data</NavLink>
                {!isLoggedIn && <NavLink to="/signup">Sign Up</NavLink>}
                {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
                {isLoggedIn && (
                    <li>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;