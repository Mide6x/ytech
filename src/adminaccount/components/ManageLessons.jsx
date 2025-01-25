import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

function ManageLessons() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        mediaType: 'video',
        difficulty: 'beginner',
        category: 'numbers'
    });
    const [mediaFile, setMediaFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMediaFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // First upload the media file
            const formDataWithFile = new FormData();
            formDataWithFile.append('media', mediaFile);
            formDataWithFile.append('mediaType', formData.mediaType);

            const uploadResponse = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formDataWithFile
            });

            const uploadData = await uploadResponse.json();

            if (!uploadResponse.ok) {
                throw new Error(uploadData.message || 'Error uploading file');
            }

            // Then create the lesson with the media URL
            const lessonResponse = await fetch('http://localhost:3000/api/lessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...formData,
                    mediaUrl: uploadData.mediaUrl
                })
            });

            const lessonData = await lessonResponse.json();

            if (!lessonResponse.ok) {
                throw new Error(lessonData.message || 'Error creating lesson');
            }

            // Reset form and navigate
            setFormData({
                title: '',
                description: '',
                content: '',
                mediaType: 'video',
                difficulty: 'beginner',
                category: 'numbers'
            });
            setMediaFile(null);
            navigate('/admin/lessons');

        } catch (error) {
            setError(error.message);
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
                    <section className="manage-lessons">
                        <h2>Add New Lesson</h2>
                        {error && <div className="error-message">{error}</div>}
                        
                        <form onSubmit={handleSubmit} className="lesson-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Content</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Media Type</label>
                                    <select
                                        name="mediaType"
                                        value={formData.mediaType}
                                        onChange={handleChange}
                                    >
                                        <option value="video">Video</option>
                                        <option value="audio">Audio</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Upload {formData.mediaType}</label>
                                    <input
                                        type="file"
                                        accept={formData.mediaType === 'video' ? 'video/*' : 'audio/*'}
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Difficulty</label>
                                    <select
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="numbers">Numbers</option>
                                        <option value="alphabets">Alphabets</option>
                                        <option value="pronunciation">Pronunciation</option>
                                        <option value="conversations">Conversations</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding Lesson...' : 'Add Lesson'}
                            </button>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default ManageLessons; 