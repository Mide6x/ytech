import PropTypes from 'prop-types';

function ProgressOverview({ stats }) {
    return (
        <section className="progress-overview">
            <h3>Your Progress</h3>
            <div className="progress-cards">
                <div className="progress-card">
                    <i className="fas fa-star"></i>
                    <h4>Points</h4>
                    <p>{stats?.points || 0}</p>
                </div>
                <div className="progress-card">
                    <i className="fas fa-fire"></i>
                    <h4>Streak</h4>
                    <p>{stats?.streak || 0} days</p>
                </div>
                <div className="progress-card">
                    <i className="fas fa-check-circle"></i>
                    <h4>Completed</h4>
                    <p>{stats?.completedLessons || 0} lessons</p>
                </div>
            </div>
        </section>
    );
}

ProgressOverview.propTypes = {
    stats: PropTypes.shape({
        points: PropTypes.number,
        streak: PropTypes.number,
        completedLessons: PropTypes.number
    })
};

// Default props in case stats is not provided
ProgressOverview.defaultProps = {
    stats: {
        points: 0,
        streak: 0,
        completedLessons: 0
    }
};

export default ProgressOverview; 