import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/login.css';
import { API_URLS } from '../config/api';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(API_URLS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Set isAdmin flag based on user role
                localStorage.setItem('isAdmin', data.user.role === 'admin');

                // Redirect based on user role
                if (data.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="background-animation"></div>
            <Navbar />
            <main className="login-container">
                <div className="login-box">
                    <h2 className="login-title">Welcome Back!</h2>
                    <p className="login-subtitle">Continue your Yorùbá learning journey</p>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                    
                                <i className="fas fa-envelope"></i>
                    
                            <input 
                                type="email" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email" 
                                required 
                                style={{ paddingLeft: '2.5rem' }} // Adjust padding to prevent overlap
                            />
                        </div>
                        <div className="form-group">
                            <i className="fas fa-lock"></i>
                            <input 
                                type="password" 
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" 
                                required 
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                        <div className="form-options">
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="rememberMe"
                                    checked={isAdminLogin}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setIsAdminLogin(!isAdminLogin);
                                    }}
                                /> Remember me
                            </label>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsAdminLogin(!isAdminLogin);
                                }} 
                                className="admin-login-toggle"
                            >
                                {isAdminLogin ? 'Login as User' : 'Login as Admin'}
                            </button>
                        </div>
                        <button 
                            type="submit" 
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                    
                    <p className="signup-link">
                        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </main>
        </>
    );
}

export default Login; 