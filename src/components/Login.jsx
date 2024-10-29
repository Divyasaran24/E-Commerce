import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (isSignUp && password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const token = 'mockToken123'; 
            localStorage.setItem('token', token);

            if (isSignUp) {
                setMessage('Sign-up successful! Redirecting to login...');
                setTimeout(() => {
                    setIsSignUp(false);
                    navigate('/login');
                }, 1000);
            } else {
                setIsAuthenticated(true);
                navigate('/');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isSignUp && (
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <span onClick={() => setIsSignUp(!isSignUp)} className="toggle-link">
                    {isSignUp ? ' Login' : ' Sign Up'}
                </span>
            </p>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
