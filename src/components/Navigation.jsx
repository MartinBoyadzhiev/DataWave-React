// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLink from './NavLink';

function Navigation({ setIsLoggedIn, isAdmin, setIsAdmin }) {
    const [isLoggedIn, setIsLoggedInState] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const loggedIn = !!token;
        setIsLoggedInState(loggedIn);
        setIsLoggedIn(loggedIn);
        setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));

        const handleLoginStatusChange = () => {
            const token = localStorage.getItem('jwtToken');
            const loggedIn = !!token;
            setIsLoggedInState(loggedIn);
            setIsLoggedIn(loggedIn);
            setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));
        };

        window.addEventListener('loginStatusChanged', handleLoginStatusChange);

        return () => {
            window.removeEventListener('loginStatusChanged', handleLoginStatusChange);
        };
    }, [setIsLoggedIn, setIsAdmin]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isAdmin');
        setIsLoggedInState(false);
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/data">Data</NavLink>
                {!isLoggedIn && <NavLink to="/signup">Sign Up</NavLink>}
                {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
                {isAdmin && <NavLink to="/admin">Admin</NavLink>}
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