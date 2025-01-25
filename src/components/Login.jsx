import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const endpoint = isAdminLogin ? 
                'http://localhost:3000/api/auth/admin/login' : 
                'http://localhost:3000/api/auth/login';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.status === 'success') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                localStorage.setItem('isAdmin', isAdminLogin);
                
                if (formData.rememberMe) {
                    localStorage.setItem('userEmail', formData.email);
                }
                
                navigate(isAdminLogin ? '/admin/dashboard' : '/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
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
                    <h2>Welcome Back!</h2>
                    <p className="login-subtitle">Continue your Yorùbá learning journey</p>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <i className="fas fa-envelope"></i>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email" 
                                required 
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
                            />
                        </div>
                        <div className="form-options">
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
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