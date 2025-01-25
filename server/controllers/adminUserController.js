import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        console.log('Fetching users...'); // Debug log

        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });
        
        console.log(`Found ${users.length} users`); // Debug log

        res.status(200).json({
            status: 'success',
            results: users.length,
            users
        });
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Error retrieving users',
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user'
        });

        // Remove password from response
        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
export const updateUser = async (req, res) => {
    try {
        // Destructure and remove password from updateData
        // eslint-disable-next-line no-unused-vars
        const { password, ...updateData } = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}; 