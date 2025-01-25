import multer from 'multer';
import path from 'path';
import fs from 'fs';

const allowedTypes = {
    video: [
        'video/mp4',
        'video/webm',
        'video/ogg',
        'video/quicktime',  // For QuickTime movies
        'video/x-quicktime' // Alternative MIME type for QuickTime
    ],
    audio: [
        'audio/mpeg',  // For MP3
        'audio/mp3',   // Alternative MIME type for MP3
        'audio/wav',
        'audio/wave',  // Alternative MIME type for WAV
        'audio/ogg',
        'audio/x-wav'  // Alternative MIME type for WAV
    ]
};

const mimeTypes = {
    video: {
        'mp4': 'video/mp4',
        'mov': 'video/quicktime',
        'webm': 'video/webm',
        'ogg': 'video/ogg'
    },
    audio: {
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'ogg': 'audio/ogg'
    }
};

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
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const mediaType = req.body.mediaType || 'video';
    if (!allowedTypes[mediaType] || !allowedTypes[mediaType].includes(file.mimetype)) {
        cb(new Error(`Invalid file type. Allowed types for ${mediaType}: ${allowedTypes[mediaType].join(', ')}`));
        return;
    }
    cb(null, true);
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

            // Get file extension and set proper content type
            const ext = path.extname(req.file.originalname).toLowerCase().slice(1);
            const mediaType = req.body.mediaType || 'video';
            const contentType = mimeTypes[mediaType][ext] || `${mediaType}/${ext}`;

            // Return the file URL with content type
            const mediaUrl = `/uploads/${req.file.filename}`;
            res.status(200).json({
                status: 'success',
                mediaUrl,
                contentType
            });
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}; 