import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Data from './pages/Data';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import Admin from './pages/Admin';
import './App.css';
import InsertData from './pages/InsertData';
import { useAccessControl } from './context/AccessControllContext';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { canAccessData } = useAccessControl();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const loggedIn = !!token;
        setIsLoggedIn(loggedIn);
        setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));
    }, []);

    return (
        <Router>
            <Navigation setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            <Routes>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} isAdmin={isAdmin} />} />
                {canAccessData && <Route path="/data" element={<Data />} />}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                {isAdmin && <Route path="/admin" element={<Admin />} />}
                {isAdmin && <Route path="/admin/insert" element={<InsertData />} />}
            </Routes>
        </Router>
    );
}

export default App;