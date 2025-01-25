import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function AdminHeader({ onMenuClick, user }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    return (
        <header className="dashboard-nav">
            <div className="dashboard-header">
                <div className="nav-left">
                    <button className="menu-button" onClick={onMenuClick}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <h1>Admin Dashboard</h1>
                </div>
                <div className="nav-right">
                    <span className="user-name">
                        <i className="fas fa-user-shield"></i> {user?.username}
                    </span>
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