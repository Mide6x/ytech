import User from '../models/User.js';

export const getProfile = async (req, res) => {
    try {
        // Get fresh user data from database
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                stats: {
                    points: user.points || 0,
                    streak: user.streak?.count || 0,
                    completedLessons: user.completedLessons?.length || 0
                }
            }
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const completeLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const completed = await user.completeLesson(lessonId);
        
        if (!completed) {
            return res.status(400).json({
                status: 'fail',
                message: 'Lesson already completed'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                stats: {
                    points: user.points,
                    streak: user.streak.count,
                    completedLessons: user.completedLessons.length
                }
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}; 