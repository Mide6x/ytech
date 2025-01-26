import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { API_URLS } from '../config/api';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(API_URLS.SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Sign up failed');
            }

            // Store token
            localStorage.setItem('token', data.token);
            
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="background-animation"></div>
            <Navbar />
            <main className="signup-container">
                <div className="signup-box">
                    <h2>Create Account</h2>
                    <p className="signup-subtitle">Join the Yorùbá learning community</p>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <i className="fas fa-user"></i>
                            <input 
                                type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username" 
                                required 
                                style={{ paddingLeft: '2.5rem' }} 
                            />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-envelope"></i>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email" 
                                required 
                                style={{ paddingLeft: '2.5rem' }} 
                            />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-lock"></i>
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password" 
                                required 
                                style={{ paddingLeft: '2.5rem' }} 
                            />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-lock"></i>
                            <input 
                                type="password" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password" 
                                required 
                                style={{ paddingLeft: '2.5rem' }} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="signup-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                    
                    <p className="login-link">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </main>
        </>
    );
}

export default SignUp; 