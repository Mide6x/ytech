import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const signToken = (id, role) => {
    return jwt.sign({ id, role }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });
};

export const signup = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: 'user' // Explicitly set role to 'user'
        });

        const token = signToken(newUser._id, newUser.role);

        // Remove password from output
        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user and explicitly select password
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }

        // Update login streak and points
        await user.updateLoginStreak();

        // Get fresh user data after streak update
        const updatedUser = await User.findById(user._id);

        // Create token
        const token = jwt.sign({ id: user._id }, config.jwtSecret, {
            expiresIn: '30d'
        });

        res.status(200).json({
            status: 'success',
            token,
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                stats: {
                    points: updatedUser.points,
                    streak: updatedUser.streak.count,
                    completedLessons: updatedUser.completedLessons.length
                }
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already registered'
            });
        }

        // Create new user (role defaults to 'user')
        const user = await User.create({
            username,
            email,
            password,
            role: 'user' // Explicitly set role to 'user'
        });

        // Create token
        const token = signToken(user._id, user.role);

        // Remove password from output
        user.password = undefined;

        res.status(201).json({
            status: 'success',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error registering user'
        });
    }
}; 