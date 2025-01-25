import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../../config/api';
import '../../styles/lessons.css';

function RecentLessons() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await fetch(API_URLS.ADMIN_LESSONS, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }

                const data = await response.json();
                // Sort lessons by date and take the most recent ones
                const sortedLessons = data.lessons
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 4); // Show only the 4 most recent lessons
                setLessons(sortedLessons);
            } catch (error) {
                console.error('Error fetching lessons:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [navigate]);

    const handleContinueLesson = (lessonId) => {
        navigate(`/lessons/${lessonId}`);
    };

    if (loading) {
        return (
            <section className="recent-lessons">
                <h3>Recent Lessons</h3>
                <div className="loading-spinner">Loading lessons...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="recent-lessons">
                <h3>Recent Lessons</h3>
                <div className="error-message">Error loading lessons: {error}</div>
            </section>
        );
    }

    return (
        <section className="recent-lessons">
            <h3>Recent Lessons</h3>
            {lessons.length === 0 ? (
                <div className="no-lessons-message">
                    <p>No lessons available yet. Check back soon!</p>
                </div>
            ) : (
                <div className="lesson-cards">
                    {lessons.map((lesson) => (
                        <div key={lesson._id} className="lesson-card">
                            <div className="lesson-card-header">
                                <h4>{lesson.title}</h4>
                                <span className={`difficulty ${lesson.difficulty}`}>
                                    {lesson.difficulty}
                                </span>
                            </div>
                            <p>{lesson.description}</p>
                            <div className="lesson-card-footer">
                                <span className="category">{lesson.category}</span>
                                <button 
                                    className="continue-button"
                                    onClick={() => handleContinueLesson(lesson._id)}
                                >
                                    Start Lesson
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default RecentLessons; 