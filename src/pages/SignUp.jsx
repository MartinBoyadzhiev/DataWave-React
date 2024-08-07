import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { 
	MDBContainer, 
	MDBInput, 
	MDBBtn, 
} from 'mdb-react-ui-kit'; 
import { useTranslation } from 'react-i18next';

function SignupPage() { 
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [confirmPassword, setConfirmPassword] = useState(''); 
	const [role, setRole] = useState('ROLE_CUSTOMER');  
	const [error, setError] = useState('');
	const history = useNavigate();
	const { t } = useTranslation();

	const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^.{6,}$/;
        return re.test(password);
    };

	const handleSignup = async () => { 
		try { 
			
			if (!email || !password || !confirmPassword) { 
				setError(t('emptyFieldError')); 
				return; 
			} 
			if (!validateEmail(email)) {
                setError(t('emailFormatError'));
                return;
            }
			if (!validatePassword(password)) {
                setError(t('passwordFormatError'));
                return;
            }

			if (password !== confirmPassword) { 
				throw new Error(t('passwordMatchError')); 
			} 

			const response = await axios.post('http://localhost:8080/auth/signup', {  
				email, 
				password, 
				role 
			});  
			history('/login'); 
		} catch (error) { 
			if (error.response && error.response.status === 409) {
				setError(error.response.data.message);
			} else {
				console.error('Signup failed:', error.response ? error.response.data : error.message); 
				setError(error.response ? error.response.data : error.message); 
			} 
		} 
	}; 

	return ( 
		<div className="auth-container">
			<div className="auth-box">
				<MDBContainer className="p-3">
					<h2 className="auth-title">{t('registration')}</h2>
					{error && <p className="text-danger">{error}</p>}
					<MDBInput className="auth-input" placeholder={t('email')} id='email' value={email} type='email'
						onChange={(e) => setEmail(e.target.value)} />
					<MDBInput className="auth-input" placeholder={t('password')} id='password' type='password' value={password}
						onChange={(e) => setPassword(e.target.value)} />
					<MDBInput className="auth-input" placeholder={t('passwordConfirm')} id='confirmPassword' type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)} />
					<button className="auth-button btn-primary" onClick={handleSignup}>{t('registerButton')}</button>
					<div className="auth-link">
						<p>{t('signinQ')} <a href="/login">{t('login')}</a></p>
					</div>
				</MDBContainer>
			</div>
		</div>
	); 
} 

export default SignupPage; 
