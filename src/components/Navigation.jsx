import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLink from './NavLink';
import ConfirmationDialog from './ConfirmationDialog';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Navigation({ setIsLoggedIn, isAdmin, setIsAdmin }) {
    const [isLoggedIn, setIsLoggedInState] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const navigate = useNavigate();
    const { t} = useTranslation();

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
                <NavLink to="/">{t('home')}</NavLink>
                {!isLoggedIn && <NavLink to="/signup">{t('signUp')}</NavLink>}
                {!isLoggedIn && <NavLink to="/login">{t('login')}</NavLink>}
                {isAdmin && <NavLink to="/admin">{t('admin')}</NavLink>}

                
                
                
                
                
            </ul>
            <div className='test'>
            {isLoggedIn && (
                        <button className="logout-button" onClick={handleLogout}>{t('logout')}</button>
                )}
                <LanguageSwitcher />
                </div>
            {showConfirmDialog && (
                <ConfirmationDialog
                    message={t('logoutQ')}
                    onConfirm={confirmLogout}
                    onCancel={cancelLogout}
                />
            )}
        </nav>
    );
}

export default Navigation;