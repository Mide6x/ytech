import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueFileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = {
        'video': ['video/mp4', 'video/webm', 'video/ogg'],
        'audio': ['audio/mpeg', 'audio/wav', 'audio/ogg']
    };

    const mediaType = req.body.mediaType;
    if (allowedTypes[mediaType] && allowedTypes[mediaType].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type. Allowed types for ${mediaType}: ${allowedTypes[mediaType].join(', ')}`));
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
}).single('media');

export const handleUpload = async (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    status: 'fail',
                    message: err.message
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'No file uploaded'
                });
            }

            // Return the file URL
            const mediaUrl = `/uploads/${req.file.filename}`;
            res.status(200).json({
                status: 'success',
                mediaUrl
            });
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}; 