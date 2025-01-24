import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function Progress() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="dashboard">
            <Header 
                onMenuClick={() => setIsSidebarOpen(true)} 
                onLogout={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }}
            />
            
            <div className="dashboard-container">
                <Sidebar 
                    user={user}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="dashboard-main">
                    <section className="progress-section">
                        <h2>Your Learning Progress</h2>
                        <div className="progress-details">
                            <div className="progress-charts">
                                <div className="chart-card">
                                    <h3>Weekly Activity</h3>
                                    {/* Add chart component here */}
                                    <div className="placeholder-chart">
                                        Coming Soon: Activity Tracking
                                    </div>
                                </div>
                                <div className="chart-card">
                                    <h3>Mastery Level</h3>
                                    {/* Add chart component here */}
                                    <div className="placeholder-chart">
                                        Coming Soon: Mastery Tracking
                                    </div>
                                </div>
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

export default Progress; 