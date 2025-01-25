import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import ThemeToggle from '../../components/ThemeToggle';
import './AdminHeader.css';

function AdminHeader({ onMenuClick, user }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    return (
        <header className="admin-header">
            <div className="header-left">
                <button className="menu-btn" onClick={onMenuClick}>
                    <FaBars />
                </button>
                <h1>Admin Dashboard</h1>
            </div>
            <div className="header-right">
                <ThemeToggle />
                <div className="admin-info">
                    <span>{user?.username}</span>
                    <div className="admin-avatar">
                        {user?.username.charAt(0).toUpperCase()}
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

AdminHeader.propTypes = {
    onMenuClick: PropTypes.func.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string
    })
};

export default AdminHeader; 