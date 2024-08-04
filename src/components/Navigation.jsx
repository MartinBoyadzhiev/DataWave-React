import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLink from './NavLink';
import ConfirmationDialog from './ConfirmationDialog';

function Navigation({ setIsLoggedIn, isAdmin, setIsAdmin }) {
    const [isLoggedIn, setIsLoggedInState] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
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
        setShowConfirmDialog(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isAdmin');
        setIsLoggedInState(false);
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
        setShowConfirmDialog(false);
    };

    const cancelLogout = () => {
        setShowConfirmDialog(false);
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <NavLink to="/">Home</NavLink>
                {!isLoggedIn && <NavLink to="/signup">Sign Up</NavLink>}
                {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
                {isAdmin && <NavLink to="/admin">Admin</NavLink>}
                {isLoggedIn && (
                    <li>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
            {showConfirmDialog && (
                <ConfirmationDialog
                    message="Are you sure you want to logout?"
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                />
            )}
        </nav>
    );
}

export default Navigation;