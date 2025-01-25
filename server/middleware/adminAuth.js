import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import User from '../models/User.js';

export const protectAdmin = async (req, res, next) => {
    try {
        // 1) Get token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in'
            });
        }

        // 2) Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // 3) Check if user still exists and is admin
        const currentUser = await User.findById(decoded.id);
        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(401).json({
                status: 'fail',
                message: 'Not authorized as admin'
            });
        }

        // 4) Grant access to protected route
        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid token or not authorized'
        });
    }
}; 