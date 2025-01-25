import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URLS } from '../config/api';
import '../styles/lessonPlayer.css';

function LessonPlayer() {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');
    const mediaRef = useRef(null);

    useEffect(() => {
        const fetchLessonAndNotes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                // Fetch lesson
                const lessonResponse = await fetch(API_URLS.LESSON_DETAIL(lessonId), {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!lessonResponse.ok) throw new Error('Failed to fetch lesson');
                const lessonData = await lessonResponse.json();
                setLesson(lessonData.lesson);

                // Fetch notes
                const notesResponse = await fetch(API_URLS.GET_NOTE(lessonId), {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (notesResponse.ok) {
                    const notesData = await notesResponse.json();
                    if (notesData.note) {
                        setNotes(notesData.note.content);
                    }
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLessonAndNotes();
    }, [lessonId, navigate]);

    const handleMediaEnded = () => {
        setVideoEnded(true);
    };

    const handleCompleteLesson = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(API_URLS.USER_COMPLETE_LESSON(lessonId), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setCompleted(true);
            }
        } catch (error) {
            console.error('Error completing lesson:', error);
        }
    };

    const handleSaveNotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(API_URLS.SAVE_NOTE, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lessonId,
                    content: notes
                })
            });

            if (response.ok) {
                setSaveStatus('Notes saved successfully!');
                setTimeout(() => setSaveStatus(''), 3000);
            }
        } catch (error) {
            setSaveStatus('Error saving notes');
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    if (loading) return <div className="loading">Loading lesson...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!lesson) return <div className="error">Lesson not found</div>;

    const mediaUrl = `${import.meta.env.VITE_BACKEND_URL}${lesson.mediaUrl}`;

    return (
        <div className="lesson-player-container">
            <div className="lesson-content">
                <h2>{lesson.title}</h2>
                <p className="description">{lesson.description}</p>
                
                <div className="media-container">
                    {lesson.mediaType === 'video' ? (
                        <video
                            ref={mediaRef}
                            controls
                            onEnded={handleMediaEnded}
                            className="media-player"
                        >
                            <source 
                                src={mediaUrl} 
                                type={lesson.mediaType === 'video' ? 'video/mp4' : 'video/quicktime'} 
                            />
                            Your browser does not support video playback.
                        </video>
                    ) : (
                        <audio
                            ref={mediaRef}
                            controls
                            onEnded={handleMediaEnded}
                            className="media-player"
                        >
                            <source src={mediaUrl} type="audio/mpeg" />
                            Your browser does not support audio playback.
                        </audio>
                    )}
                </div>

                <div className="notes-section">
                    <h3>Notes</h3>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Take notes here..."
                        rows="4"
                    />
                    <div className="notes-actions">
                        <button 
                            className="save-notes-button"
                            onClick={handleSaveNotes}
                        >
                            Save Notes
                        </button>
                        {saveStatus && <span className="save-status">{saveStatus}</span>}
                    </div>
                </div>

                <div className="lesson-content-text">
                    <h3>Lesson Content</h3>
                    <p>{lesson.content}</p>
                </div>

                <div className="lesson-actions">
                    <button 
                        className={`complete-button ${!videoEnded ? 'disabled' : ''}`}
                        onClick={handleCompleteLesson}
                        disabled={!videoEnded || completed}
                    >
                        {completed ? 'Lesson Completed!' : 'Complete Lesson'}
                    </button>
                </div>

                {completed && (
                    <div className="completion-message">
                        <h3>🎉 Congratulations!</h3>
                        <p>You&apos;ve completed this lesson and earned 50 points!</p>
                        <button 
                            className="return-button"
                            onClick={() => navigate('/dashboard')}
                        >
                            Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LessonPlayer; 