import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

function ManageUsers() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);
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

        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            
            if (data.status === 'success') {
                setUsers(data.users);
            } else {
                setError(data.message);
            }
        } catch (error) { // Changed '_' to 'error' to avoid unused variable
            setError('Error fetching users');
        } finally {
            setIsLoading(false);
        }
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
                    <section className="manage-users">
                        <h2>Manage Users</h2>
                        {error && <div className="error-message">{error}</div>}
                        
                        {isLoading ? (
                            <div className="loading">Loading users...</div>
                        ) : (
                            <div className="users-grid">
                                {users.map(user => (
                                    <div key={user._id} className="user-card">
                                        <div className="user-info">
                                            <h3>{user.username}</h3>
                                            <p>{user.email}</p>
                                            <p>Role: {user.role}</p>
                                            <p>Points: {user.points}</p>
                                            <p>Completed Lessons: {user.completedLessons.length}</p>
                                        </div>
                                        <div className="user-actions">
                                            <button className="edit-btn">Edit</button>
                                            <button className="delete-btn">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default ManageUsers; 