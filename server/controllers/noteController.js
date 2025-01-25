import Note from '../models/Note.js';

export const saveNote = async (req, res) => {
    try {
        const { lessonId, content } = req.body;
        const userId = req.user._id;

        const note = await Note.findOneAndUpdate(
            { userId, lessonId },
            { content, updatedAt: Date.now() },
            { upsert: true, new: true }
        );

        res.status(200).json({
            status: 'success',
            note
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const getNote = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const userId = req.user._id;

        const note = await Note.findOne({ userId, lessonId });

        res.status(200).json({
            status: 'success',
            note
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}; 