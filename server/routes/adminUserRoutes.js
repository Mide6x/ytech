import express from 'express';
import { getAllUsers, deleteUser, createUser, updateUser } from '../controllers/adminUserController.js';
import { protectAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Protect all routes
router.use(protectAdmin);

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

export default router; 