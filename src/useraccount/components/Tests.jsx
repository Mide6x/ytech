import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function Tests() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
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
                    <section className="tests-section">
                        <h2>Available Tests</h2>
                        <div className="tests-grid">
                            <div className="test-card">
                                <h3>Basic Greetings Test</h3>
                                <p>Test your knowledge of Yorùbá greetings</p>
                                <div className="test-info">
                                    <span>10 Questions</span>
                                    <span>15 Minutes</span>
                                </div>
                                <button className="start-test-btn">Start Test</button>
                            </div>
                            <div className="test-card">
                                <h3>Numbers Quiz</h3>
                                <p>Practice counting in Yorùbá</p>
                                <div className="test-info">
                                    <span>15 Questions</span>
                                    <span>20 Minutes</span>
                                </div>
                                <button className="start-test-btn">Start Test</button>
                            </div>
                            {/* Add more test cards as needed */}
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

export default Tests; 