import Lesson from '../models/Lesson.js';

export const calculateWeeklyActivity = async (user) => {
    const now = new Date();
    const weekAgo = new Date(now.setDate(now.getDate() - 7));
    
    const weeklyActivity = new Array(7).fill(0);
    
    user.analytics.dailyActivity
        .filter(activity => activity.date >= weekAgo)
        .forEach(activity => {
            const dayIndex = new Date(activity.date).getDay();
            weeklyActivity[dayIndex] = activity.timeSpent;
        });
    
    return weeklyActivity;
};

export const calculateMasteryLevels = async (user) => {
    const categories = ['numbers', 'greetings', 'conversations', 'grammar'];
    const lessons = await Lesson.find();
    
    const byCategory = {};
    categories.forEach(category => {
        const totalInCategory = lessons.filter(lesson => lesson.category === category).length;
        const completedInCategory = user.completedLessons.filter(lessonId => 
            lessons.find(l => l._id.equals(lessonId) && l.category === category)
        ).length;
        
        byCategory[category] = totalInCategory ? 
            Math.round((completedInCategory / totalInCategory) * 100) : 0;
    });

    return {
        overall: Object.values(byCategory).reduce((a, b) => a + b, 0) / categories.length,
        byCategory
    };
};

export const analyzeLearningPatterns = (user) => {
    const patterns = {
        bestTime: 'morning',
        strongestCategory: 'numbers',
        averageSessionLength: 0
    };

    if (user.analytics?.preferences) {
        patterns.bestTime = user.analytics.preferences.studyTimes[0] || 'morning';
        patterns.strongestCategory = user.analytics.preferences.favoriteCategories[0] || 'numbers';
        patterns.averageSessionLength = user.analytics.preferences.averageSessionLength || 0;
    }

    return patterns;
}; 