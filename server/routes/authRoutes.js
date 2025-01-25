import express from 'express';
import { signup, login } from '../controllers/authController.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Mount admin routes
router.use('/admin', adminRoutes);

export default router; 