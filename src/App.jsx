import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Data from './pages/Data';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import Navigation from './components/Navigation';
import Admin from './pages/Admin';

function App() {
	// FIXME: Implement login status check
	const isAdmin = localStorage.getItem('isAdmin');

	return (
		<Router>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/data" element={<Data />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				{isAdmin && <Route path="/admin" element={<Admin />} />}
			</Routes>
		</Router>
	);
}

export default App;