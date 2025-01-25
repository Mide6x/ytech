import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

function AdminSettings() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !isAdmin || user?.role !== 'admin') {
            navigate('/login');
            return;
        }
    }, [navigate]);

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
                    <section className="admin-settings">
                        <h2>Admin Settings</h2>
                        <div className="settings-container">
                            <div className="settings-card">
                                <h3>Site Settings</h3>
                                {/* Add site settings controls here */}
                            </div>

                            <div className="settings-card">
                                <h3>Email Settings</h3>
                                {/* Add email settings controls here */}
                            </div>

                            <div className="settings-card">
                                <h3>Security Settings</h3>
                                {/* Add security settings controls here */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default AdminSettings; 