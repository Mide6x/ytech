import express from 'express';
import { adminLogin } from '../controllers/adminAuthController.js';

const router = express.Router();

// The path will be /api/auth/admin/login
router.post('/login', adminLogin);

export default router; 