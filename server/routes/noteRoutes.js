import express from 'express';
import { saveNote, getNote } from '../controllers/noteController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Protect all note routes

router.post('/', saveNote);
router.get('/:lessonId', getNote);

export default router; 