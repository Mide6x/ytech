import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ user, isOpen, onClose }) {
    const location = useLocation();

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
                    <i className="fas fa-user-circle"></i>
                </div>
                <h3>{user?.username}</h3>
                <p>{user?.email}</p>
            </div>
            
            <nav className="dashboard-menu">
                <div className="menu-links">
                    <Link 
                        to="/dashboard" 
                        className={`menu-item ${isActiveRoute('/dashboard') ? 'active' : ''}`}
                    >
                        <i className="fas fa-book-open"></i>
                        <span>My Lessons</span>
                    </Link>
                    <Link 
                        to="/dashboard/progress" 
                        className={`menu-item ${isActiveRoute('/dashboard/progress') ? 'active' : ''}`}
                    >
                        <i className="fas fa-chart-line"></i>
                        <span>Progress</span>
                    </Link>
                    <Link 
                        to="/dashboard/practice" 
                        className={`menu-item ${isActiveRoute('/dashboard/practice') ? 'active' : ''}`}
                    >
                        <i className="fas fa-pen"></i>
                        <span>Tests</span>
                    </Link>
                    <Link 
                        to="/dashboard/settings" 
                        className={`menu-item ${isActiveRoute('/dashboard/settings') ? 'active' : ''}`}
                    >
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                    </Link>
                </div>
            </nav>
        </aside>
    );
}

Sidebar.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Sidebar; 