import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import './ThemeToggle.css';

function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
}

export default ThemeToggle; 