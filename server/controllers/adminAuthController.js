import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists and is an admin
        const admin = await User.findOne({ email, role: 'admin' }).select('+password');
        
        if (!admin || !(await admin.correctPassword(password, admin.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials or not authorized as admin'
            });
        }

        // Create token
        const token = jwt.sign({ id: admin._id }, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn
        });

        // Remove password from output
        admin.password = undefined;

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: admin
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}; 