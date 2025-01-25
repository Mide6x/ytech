import express from 'express';
import { adminLogin } from '../controllers/adminAuthController.js';
import { getAllUsers, deleteUser, createUser, updateUser } from '../controllers/adminUserController.js';
import { getAdminMetrics } from '../controllers/adminMetricsController.js';
import { protectAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Public admin routes
router.post('/login', adminLogin);

// Protected admin routes
router.use(protectAdmin); // All routes below this middleware require admin auth

// User management routes
router.get('/users', getAllUsers);           // GET /api/admin/users
router.post('/users', createUser);           // POST /api/admin/users
router.patch('/users/:id', updateUser);      // PATCH /api/admin/users/:id
router.delete('/users/:id', deleteUser);     // DELETE /api/admin/users/:id

// Admin metrics route
router.get('/metrics', getAdminMetrics);     // GET /api/admin/metrics

export default router; 