import express from 'express';
import { createLesson, getLessons, deleteLesson } from '../controllers/lessonController.js';
import { handleUpload } from '../controllers/uploadController.js';
import { protectAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/', getLessons);

// Protected admin routes
router.post('/', protectAdmin, createLesson);
router.delete('/:id', protectAdmin, deleteLesson);

// File upload route
router.post('/upload', protectAdmin, handleUpload);

export default router; 