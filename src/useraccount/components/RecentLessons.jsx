import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RecentLessons() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            navigate('/login');
            return;
        }

        try {
            JSON.parse(storedUser); // Just validate the JSON, but don't store it
        } catch (error) {
            console.error('Error parsing user data:', error);
            navigate('/login');
        }
    }, [navigate]);

    return (
        <section className="recent-lessons">
            <h3>Recent Lessons</h3>
            <div className="lesson-cards">
                <div className="lesson-card">
                    <h4>Basic Greetings</h4>
                    <p>Learn common Yorùbá greetings</p>
                    <button className="continue-button">Continue</button>
                </div>
                <div className="lesson-card">
                    <h4>Numbers 1-10</h4>
                    <p>Master counting in Yorùbá</p>
                    <button className="continue-button">Start</button>
                </div>
            </div>
        </section>
    );
}

export default RecentLessons; 