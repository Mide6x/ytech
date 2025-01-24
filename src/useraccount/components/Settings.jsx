import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function Settings() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? savedMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }

        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        // Update dark mode class on document
        document.documentElement.classList.toggle('dark-mode', isDarkMode);
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleThemeChange = (e) => {
        const newDarkMode = e.target.checked;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
        document.documentElement.classList.toggle('dark-mode', newDarkMode);
    };

    return (
        <div className="dashboard">
            <Header 
                onMenuClick={() => setIsSidebarOpen(true)} 
                onLogout={handleLogout}
            />
            
            <div className="dashboard-container">
                <Sidebar 
                    user={user}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="dashboard-main">
                    <section className="settings-section">
                        <h2>Account Settings</h2>
                        <div className="settings-container">
                            <div className="settings-card">
                                <h3>Profile Information</h3>
                                <form className="settings-form">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" defaultValue={user?.username} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" defaultValue={user?.email} />
                                    </div>
                                    <button type="submit" className="save-btn">Save Changes</button>
                                </form>
                            </div>

                            <div className="settings-card">
                                <h3>Appearance</h3>
                                <div className="preferences-list">
                                    <div className="preference-item">
                                        <label className="theme-switch">
                                            <input 
                                                type="checkbox" 
                                                checked={isDarkMode}
                                                onChange={handleThemeChange}
                                            />
                                            <span className="theme-slider"></span>
                                            Dark Mode
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3>Notifications</h3>
                                <div className="preferences-list">
                                    <div className="preference-item">
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                checked={notifications}
                                                onChange={(e) => setNotifications(e.target.checked)}
                                            />
                                            Push Notifications
                                        </label>
                                    </div>
                                    <div className="preference-item">
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                checked={emailUpdates}
                                                onChange={(e) => setEmailUpdates(e.target.checked)}
                                            />
                                            Email Updates
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-card danger-zone">
                                <h3>Danger Zone</h3>
                                <button className="delete-account-btn">Delete Account</button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            {isSidebarOpen && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default Settings; 