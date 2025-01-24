import PropTypes from 'prop-types';

function Header({ onMenuClick, onLogout }) {
    return (
        <nav className="dashboard-nav">
            <div className="dashboard-header">
                <div className="header-left">
                    <button className="mobile-menu" onClick={onMenuClick}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <h1>YorùbáTech</h1>
                </div>
                <button onClick={onLogout} className="logout-button">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
}

Header.propTypes = {
    onMenuClick: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default Header; 