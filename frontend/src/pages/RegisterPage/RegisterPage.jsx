import React, { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userName = localStorage.getItem('userName');
        if (userName) {
            navigate('/autoapply'); // Redirect to the AutoApply page if logged in
        }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration failed', error);
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        // <div className="entry">
        //     <div className="wrapper">
        //         <h2>Registration</h2>
        //         {error && <div className="error-message">{error}</div>}
        //         <form onSubmit={handleSubmit}>
        //             <div className="input-box">
        //                 <input
        //                     type="text"
        //                     placeholder="Enter your username"
        //                     value={username}
        //                     onChange={(e) => setUsername(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className="input-box">
        //                 <input
        //                     type="email"
        //                     placeholder="Enter your email"
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className="input-box">
        //                 <input
        //                     type="password"
        //                     placeholder="Create password"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className="input-area">
        //                 <input
        //                     type="password"
        //                     placeholder="Confirm password"
        //                     value={confirmPassword}
        //                     onChange={(e) => setConfirmPassword(e.target.value)}
        //                     required
        //                 />
        //             </div>
        //             <div className="login-btn">
        //                 <input type="submit" value="Register Now" />
        //             </div>
                    
        //         </form>
        //         <a href="http://localhost:5000/api/auth/google">
        //             <button> 🌈 Sign in with Google</button>
        //         </a>
        //         <div className="alt">
        //                Already have an account? <a href="/login">Login now</a>
        //             </div>
        //     </div>
        // </div>
        <div className="entry">
    <div className="wrapper">
    <img className="loginimg" src="Automation.png" alt="" />
                
                <header>Applify</header>
                <br></br>
                <p className='name'>SIGN UP</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
            <div className="field username">
                <div className="input-area">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <i className="icon fas fa-user"></i>
                    <i className="error error-icon fas fa-exclamation-circle"></i>
                </div>
            </div>
            <div className="field email">
                <div className="input-area">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <i className="icon fas fa-lock"></i>
                    <i className="error error-icon fas fa-exclamation-circle"></i>
                </div>
            </div>
            <div className="field confirm-password">
                <div className="input-area">
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <i className="icon fas fa-lock"></i>
                    <i className="error error-icon fas fa-exclamation-circle"></i>
                </div>
            </div>
            <button type="submit" className="login-btn">Register Now</button>
        </form>

        {/* Google Sign-In Button */}
        <a href="http://localhost:5000/api/auth/google">
            <button className="google-btn"> Sign in with Google</button>
        </a>

        <div className="alt">Already have an account? <a href="/login">Login now</a></div>
    </div>
</div>

    );
}

export default RegisterPage;
