import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // // UseEffect to handle Google sign-in email extraction
    // useEffect(() => {
    //     // Extract the email from the query string (for Google sign-in)
    //     const params = new URLSearchParams(window.location.search);
    //     const googleEmail = params.get('email');

    //     if (googleEmail) {
    //         // Store the email in localStorage if it's from Google login
    //         localStorage.setItem('userEmail', googleEmail);
    //         navigate('/autoapply'); // Redirect to the AutoApply page
    //     }
    // }, [navigate]);



    useEffect(() => {

        const userName = localStorage.getItem('userName');
        if (userName) {
            navigate('/autoapply'); // Redirect to the AutoApply page if logged in
        }

        // Extract the email and userName from the query string (for Google sign-in)
        const params = new URLSearchParams(window.location.search);
        const googleEmail = params.get('email');
        const googleName = params.get('name'); // Extract the name from the URL
    
        if (googleEmail && googleName) {
            // Store the email and name in localStorage if they're from Google login
            localStorage.setItem('userEmail', googleEmail);
            localStorage.setItem('userName', googleName); // Store the userName
    
            navigate('/autoapply'); // Redirect to the AutoApply page
        }
    }, [navigate]);
    


    // Handle manual email/password login
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError(''); // Clear error when input changes
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError(''); // Clear error when input changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            if (response.status === 200) {
                // localStorage.setItem('authToken', response.data.token); // Save the token
                localStorage.setItem('userEmail', response.data.user.email); // Save the user email
                localStorage.setItem('userName', response.data.user.username); // Save the username
                navigate('/autoapply'); // Redirect to the AutoApply page
            }
        } catch (error) {
            console.error('Login failed', error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className='entry'>
            <div className="wrapper">
                <img className="loginimg" src="Automation.png" alt="" />
                
                <header>Applify</header>
                <br></br>
                <p className='name'>LOGIN</p>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="field email">
                        <div className="input-area">
                            <input 
                                type="email" 
                                value={email} 
                                onChange={handleEmailChange} 
                                placeholder="Email" 
                                required
                            />
                            <i className="icon fas fa-envelope"></i>
                            <i className="error error-icon fas fa-exclamation-circle"></i>
                        </div>
                    </div>
                    <div className="field password">
                        <div className="input-area">
                            <input 
                                type="password" 
                                value={password} 
                                onChange={handlePasswordChange} 
                                placeholder="Password" 
                                required
                            />
                            <i className="icon fas fa-lock"></i>
                            <i className="error error-icon fas fa-exclamation-circle"></i>
                        </div>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>

                {/* Google Sign-In Button */}
                <a href="http://localhost:5000/api/auth/google">
                    <button className="google-btn">Sign in with Google</button>
                </a>

                <div className="alt" >Not yet a member? <a href="/register">Signup now</a></div>
            </div>
        </div>
    );
}

export default LoginPage;
