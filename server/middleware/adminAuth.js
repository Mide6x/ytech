import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import User from '../models/User.js';

export const protectAdmin = async (req, res, next) => {
    try {
        console.log('Checking admin authorization...'); // Debug log
        console.log('Headers:', req.headers); // Debug log

        // 1) Get token
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            console.log('No token provided in request');
            return res.status(401).json({
                status: 'fail',
                message: 'No authentication token provided'
            });
        }

        // 2) Verify token
        const decoded = jwt.verify(token, config.jwtSecret);
        console.log('Token decoded:', { userId: decoded.id, role: decoded.role });

        // 3) Check if user still exists and is admin
        const currentUser = await User.findById(decoded.id).maxTimeMS(5000); // Add timeout
        
        if (!currentUser) {
            console.log('User not found:', decoded.id);
            return res.status(401).json({
                status: 'fail',
                message: 'User no longer exists'
            });
        }

        if (currentUser.role !== 'admin') {
            console.log('Non-admin access attempt:', currentUser.email);
            return res.status(403).json({
                status: 'fail',
                message: 'Not authorized as admin'
            });
        }

        // 4) Grant access to protected route
        console.log('Admin access granted:', currentUser.email);
        req.user = currentUser;
        console.log('Admin authorization successful'); // Debug log
        next();
    } catch (error) {
        console.error('Admin auth error:', error);
        
        // Handle different types of errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'fail',
                message: 'Token has expired'
            });
        }

        if (error.name === 'MongooseError') {
            return res.status(500).json({
                status: 'error',
                message: 'Database connection error'
            });
        }

        res.status(500).json({
            status: 'error',
            message: 'Authorization failed'
        });
    }
}; 