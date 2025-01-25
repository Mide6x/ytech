import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import { API_URLS } from '../config/api';

function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        totalLessons: 0,
        averageTimeSpent: 0,
        activeUsers: 0,
        completedLessons: 0,
        userProgress: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !isAdmin || user?.role !== 'admin') {
            navigate('/login');
            return;
        }

        fetchMetrics();
    }, [navigate]);

    const fetchMetrics = async () => {
        try {
            const response = await fetch(API_URLS.ADMIN_METRICS, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 'success') {
                setMetrics(data.metrics);
            } else {
                setError(data.message || 'Failed to fetch metrics');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error fetching metrics: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="dashboard">
            <AdminHeader 
                onMenuClick={() => setIsSidebarOpen(true)}
                user={JSON.parse(localStorage.getItem('user'))}
            />
            
            <div className="dashboard-container">
                <AdminSidebar 
                    user={JSON.parse(localStorage.getItem('user'))}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="dashboard-main">
                    <section className="admin-metrics">
                        <h2>Dashboard Overview</h2>
                        {error && <div className="error-message">{error}</div>}
                        
                        {isLoading ? (
                            <div className="loading">Loading metrics...</div>
                        ) : (
                            <>
                                <div className="metrics-grid">
                                    <div className="metric-card">
                                        <div className="metric-icon">
                                            <i className="fas fa-users"></i>
                                        </div>
                                        <div className="metric-content">
                                            <h3>Total Users</h3>
                                            <p className="metric-value">{metrics.totalUsers}</p>
                                            <p className="metric-label">Active Users Today: {metrics.activeUsers}</p>
                                        </div>
                                    </div>

                                    <div className="metric-card">
                                        <div className="metric-icon">
                                            <i className="fas fa-book"></i>
                                        </div>
                                        <div className="metric-content">
                                            <h3>Total Lessons</h3>
                                            <p className="metric-value">{metrics.totalLessons}</p>
                                            <p className="metric-label">Completed: {metrics.completedLessons}</p>
                                        </div>
                                    </div>

                                    <div className="metric-card">
                                        <div className="metric-icon">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <div className="metric-content">
                                            <h3>Average Time Spent</h3>
                                            <p className="metric-value">
                                                {formatTime(metrics.averageTimeSpent)}
                                            </p>
                                            <p className="metric-label">Per User/Day</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="progress-section">
                                    <h3>User Progress Overview</h3>
                                    <div className="progress-chart">
                                        {/* Add chart visualization here */}
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
