import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A lesson must have a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A lesson must have a description']
    },
    content: {
        type: String,
        required: [true, 'A lesson must have content']
    },
    mediaType: {
        type: String,
        enum: ['video', 'audio'],
        required: [true, 'Please specify media type']
    },
    mediaUrl: {
        type: String,
        required: [true, 'Media URL is required']
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    category: {
        type: String,
        enum: ['numbers', 'alphabets', 'pronunciation', 'conversations'],
        required: [true, 'A lesson must have a category']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Lesson', lessonSchema); 