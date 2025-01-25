import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { FaUserEdit, FaTrash, FaSearch, FaUserPlus } from 'react-icons/fa';
import './ManageUsers.css';
import { API_URLS } from '../../config/api';
function ManageUsers() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
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
            console.log('Fetching users...'); // Debug log
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(API_URLS.ADMIN_USERS, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Response not ok:', response.status, errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.status === 'success' && data.users) {
                console.log('Users fetched successfully:', data.users.length);
                setUsers(data.users);
            } else {
                throw new Error(data.message || 'Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(`Error fetching users: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`${API_URLS.ADMIN_USERS}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setUsers(users.filter(user => user._id !== userId));
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            setError(`Error deleting user: ${error.message}`);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

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

                <main className="manage-users-main">
                    <div className="manage-users-header">
                        <h2>Manage Users</h2>
                        <button className="add-user-btn">
                            <FaUserPlus /> Add New User
                        </button>
                    </div>

                    <div className="manage-users-controls">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="role-filter"
                        >
                            <option value="all">All Roles</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i> {error}
                        </div>
                    )}
                    
                    {isLoading ? (
                        <div className="loading-container">
                            <div className="loader"></div>
                            <p>Loading users...</p>
                        </div>
                    ) : (
                        <div className="users-grid">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <div key={user._id} className="user-card">
                                        <div className="user-card-header">
                                            <div className="user-avatar">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="user-role-badge" data-role={user.role}>
                                                {user.role}
                                            </div>
                                        </div>
                                        <div className="user-info">
                                            <h3>{user.username}</h3>
                                            <p className="user-email">{user.email}</p>
                                            <div className="user-stats">
                                                <div className="stat">
                                                    <span className="stat-label">Points</span>
                                                    <span className="stat-value">{user.points || 0}</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Lessons</span>
                                                    <span className="stat-value">{user.completedLessons?.length || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user-actions">
                                            <button className="edit-btn" title="Edit user">
                                                <FaUserEdit />
                                            </button>
                                            <button 
                                                className="delete-btn" 
                                                onClick={() => handleDelete(user._id)}
                                                title="Delete user"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-users-message">
                                    <i className="fas fa-users-slash"></i>
                                    <p>No users found</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ManageUsers; 