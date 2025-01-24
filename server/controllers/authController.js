import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import bcrypt from 'bcryptjs';

const signToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });
};

export const signup = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email
                }
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

        // Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }

        // Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }

        // Update streak and points
        await user.updateLoginStreak();

        // Create token
        const token = jwt.sign(
            { id: user._id },
            config.jwtSecret,
            { expiresIn: config.jwtExpiresIn }
        );

        // Remove password from output
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    stats: {
                        points: user.points,
                        streak: user.streak.count,
                        completedLessons: user.completedLessons.length
                    }
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}; 