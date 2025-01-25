import express from 'express';
import { getProfile, completeLesson } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Protect all user routes

router.get('/profile', getProfile);
router.post('/complete-lesson/:lessonId', completeLesson);

export default router; 