import User from '../models/User.js';
import Lesson from '../models/Lesson.js';

export const getAdminMetrics = async (req, res) => {
    try {
        console.log('Fetching admin metrics...'); // Debug log

        // Get total users
        const totalUsers = await User.countDocuments();
        
        // Get total lessons
        const totalLessons = await Lesson.countDocuments();
        
        // Get active users (logged in within last 24 hours)
        const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const activeUsers = await User.countDocuments({
            lastLoginDate: { $gte: lastDay }
        });

        // Get completed lessons count
        const completedLessons = await User.aggregate([
            { $unwind: '$completedLessons' },
            { $group: { _id: null, total: { $sum: 1 } } }
        ]).then(result => result[0]?.total || 0);

        // Calculate average time spent (placeholder)
        const averageTimeSpent = 45; // minutes per day

        // Get user progress overview
        const userProgress = await User.find()
            .select('username completedLessons points')
            .limit(10)
            .sort({ points: -1 });

        console.log('Metrics fetched successfully'); // Debug log

        res.status(200).json({
            status: 'success',
            metrics: {
                totalUsers,
                totalLessons,
                activeUsers,
                completedLessons,
                averageTimeSpent,
                userProgress
            }
        });
    } catch (error) {
        console.error('Error fetching admin metrics:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Error retrieving admin metrics',
            error: error.message
        });
    }
}; 