import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { 
	MDBContainer, 
	MDBInput
} from 'mdb-react-ui-kit'; 
import { useTranslation } from 'react-i18next';

function LoginPage() { 
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [error, setError] = useState(''); 
	const history = useNavigate(); 
	const { t } = useTranslation();

	const handleLogin = async () => { 
		try { 
			if (!email || !password) { 
				setError('Please enter both username and password.'); 
				return; 
			} 

			const response = await axios.post('http://localhost:8080/auth/signin', { email, password }); 
			const {jwt, admin} = response.data;
			localStorage.setItem('jwtToken', jwt);
			localStorage.setItem('isAdmin', admin);
			console.log('Login successful:', response.data); 
			window.dispatchEvent(new Event('loginStatusChanged'));

			history('/'); 
		} catch (error) { 
			console.error('Login failed:', error.response ? error.response.data : error.message); 
			setError('Invalid username or password.'); 
		} 
	}; 

	return ( 
		<div className="auth-container"> 
			<div className="auth-box"> 
				<MDBContainer className="p-3"> 
					<h2 className="auth-title">{t('login')}</h2> 
					<MDBInput className="auth-input" placeholder={t('email')} id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} /> 
					<MDBInput className="auth-input" placeholder={t('password')} id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} /> 
					{error && <p className="text-danger">{error}</p>} 
					<button className="auth-button btn-primary" onClick={handleLogin}>{t('loginButton')}</button> 
					<div className="auth-link"> 
						<p>{t('loginQ')} <a href="/signup">{t('registerButton')}</a></p> 
					</div> 
				</MDBContainer> 
			</div> 
		</div> 
	); 
} 

export default LoginPage; 
