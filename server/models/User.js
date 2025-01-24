import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    points: {
        type: Number,
        default: 0
    },
    streak: {
        count: { type: Number, default: 0 },
        lastLogin: { type: Date, default: null }
    },
    completedLessons: [{
        lessonId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Lesson'
        },
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    lastLoginDate: {
        type: Date,
        default: null
    }
});

// Password encryption middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Update streak and points on login
userSchema.methods.updateLoginStreak = async function() {
    const now = new Date();
    const lastLogin = this.streak.lastLogin;
    
    // First time login
    if (!lastLogin) {
        this.streak.count = 1;
        this.points += 5; // Login points
    } else {
        const timeDiff = now - lastLogin;
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        if (hoursDiff <= 48 && hoursDiff > 24) {
            // User logged in the next day
            this.streak.count += 1;
            this.points += 5; // Login points
        } else if (hoursDiff <= 24) {
            // User logged in same day - no streak increase
            // No points for multiple logins in same day
        } else {
            // Break the streak if more than 48 hours
            this.streak.count = 1;
            this.points += 5; // Login points
        }
    }
    
    this.streak.lastLogin = now;
    this.lastLoginDate = now;
    await this.save();
};

// Add completed lesson and points
userSchema.methods.completeLesson = async function(lessonId) {
    // Check if lesson is already completed
    const isCompleted = this.completedLessons.some(
        lesson => lesson.lessonId.toString() === lessonId.toString()
    );

    if (!isCompleted) {
        this.completedLessons.push({
            lessonId,
            completedAt: new Date()
        });
        this.points += 50; // Points for completing lesson
        await this.save();
        return true;
    }
    return false;
};

// Get user stats
userSchema.methods.getStats = function() {
    return {
        points: this.points,
        streak: this.streak.count,
        completedLessons: this.completedLessons.length
    };
};

const User = mongoose.model('User', userSchema);

export default User; 