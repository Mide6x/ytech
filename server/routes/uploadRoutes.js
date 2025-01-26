import express from 'express';
import { uploadMiddleware, handleUpload } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.post('/', uploadMiddleware, handleUpload);

export default router; 