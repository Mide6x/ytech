import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav>
                <div className="logo">
                    <Link to="/">YorùbáTech</Link>
                </div>
                
                {/* Mobile Menu Button */}
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>

                {/* Navigation Links */}
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><a onClick={() => navigate('/login')}>Lessons</a></li>
                    <li><a onClick={() => navigate('/login')}>Practice</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar; 