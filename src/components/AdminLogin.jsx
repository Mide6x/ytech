import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'admin@example.com',
                    password: 'admin123456'
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate('/admin/dashboard');
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to login');
        }
    };

    return (
        <div className="admin-login">
            <h2>Admin Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleAdminLogin}>
                {/* Add your form fields here */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin; 