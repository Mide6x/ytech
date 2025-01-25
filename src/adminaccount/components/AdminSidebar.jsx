import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function AdminSidebar({ user, isOpen, onClose }) {
    const location = useLocation();

    const getInitial = (username) => {
        return username ? username.charAt(0).toUpperCase() : '?';
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    return (
        <aside className={`dashboard-sidebar ${isOpen ? 'active' : ''}`}>
            <div className="mobile-close" onClick={onClose}>
                <i className="fas fa-times"></i>
            </div>
            
            <div className="user-profile">
                <div className="user-avatar">
                    {getInitial(user?.username)}
                </div>
                <h3>{user?.username}</h3>
                <p>{user?.email}</p>
            </div>
            
            <nav className="dashboard-menu">
                <div className="menu-links">
                    <Link 
                        to="/admin/dashboard" 
                        className={`menu-item ${isActiveRoute('/admin/dashboard') ? 'active' : ''}`}
                    >
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                    <Link 
                        to="/admin/lessons" 
                        className={`menu-item ${isActiveRoute('/admin/lessons') ? 'active' : ''}`}
                    >
                        <i className="fas fa-book"></i>
                        <span>Manage Lessons</span>
                    </Link>
                    <Link 
                        to="/admin/users" 
                        className={`menu-item ${isActiveRoute('/admin/users') ? 'active' : ''}`}
                    >
                        <i className="fas fa-users"></i>
                        <span>Manage Users</span>
                    </Link>
                    <Link 
                        to="/admin/settings" 
                        className={`menu-item ${isActiveRoute('/admin/settings') ? 'active' : ''}`}
                    >
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                    </Link>
                </div>
            </nav>
        </aside>
    );
}

AdminSidebar.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default AdminSidebar; 