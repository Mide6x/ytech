import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    try {
        // 1) Get token
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'Please log in to access this resource'
            });
        }

        // 2) Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user no longer exists'
            });
        }

        // 4) Grant access to protected route
        req.user = currentUser;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({
            status: 'fail',
            message: 'Please log in to access this resource'
        });
    }
}; 