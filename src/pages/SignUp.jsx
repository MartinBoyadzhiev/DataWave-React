import React, { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import { 
	MDBContainer, 
	MDBInput, 
	MDBBtn, 
} from 'mdb-react-ui-kit'; 

function SignupPage() { 
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [confirmPassword, setConfirmPassword] = useState(''); 
	const [role, setRole] = useState('ROLE_CUSTOMER');  
	const [error, setError] = useState('');
	const history = useNavigate();

	const handleSignup = async () => { 
		try { 
			
			if (!email || !password || !confirmPassword) { 
				setError('Please fill in all fields.'); 
				return; 
			} 

			if (password !== confirmPassword) { 
				throw new Error("Passwords do not match"); 
			} 

			const response = await axios.post('http://localhost:8080/auth/signup', {  
				email, 
				password, 
				role 
			}); 
			console.log(response.data); 
			history('/login'); 
		} catch (error) { 
			console.error('Signup failed:', error.response ? error.response.data : error.message); 
			setError(error.response ? error.response.data : error.message); 
		} 
	}; 

	return ( 
		<div className="auth-container">
			<div className="auth-box">
				<MDBContainer className="p-3">
					<h2 className="auth-title">Sign Up</h2>
					{error && <p className="text-danger">{error}</p>}
					<MDBInput className="auth-input" placeholder='Email Address' id='email' value={email} type='email'
						onChange={(e) => setEmail(e.target.value)} />
					<MDBInput className="auth-input" placeholder='Password' id='password' type='password' value={password}
						onChange={(e) => setPassword(e.target.value)} />
					<MDBInput className="auth-input" placeholder='Confirm Password' id='confirmPassword' type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)} />
					<label className="form-label mb-1">Role:</label>
					<select className="form-select mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
						<option value="ROLE_USER">User</option>
						<option value="ROLE_ADMIN">Admin</option>
					</select>
					<button className="auth-button btn-primary" onClick={handleSignup}>Sign Up</button>
					<div className="auth-link">
						<p>Already Register? <a href="/login">Login</a></p>
					</div>
				</MDBContainer>
			</div>
		</div>
	); 
} 

export default SignupPage; 
