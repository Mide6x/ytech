import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
const allowedOrigins = [
    process.env.FRONTEND_URL2,          // Local development
    process.env.FRONTEND_URL,           // Production frontend
    process.env.FRONTEND_URL1           // www subdomain
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);  // Admin routes should be before user routes
app.use('/api/lessons', lessonRoutes);
app.use('/api/notes', noteRoutes);

// Error handling for CORS preflight
app.options('*', cors());

// Database connection
const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...', config.mongoURI);
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

// Connect to database before starting server
connectDB().then(() => {
    const PORT = config.port || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

// 404 handler
app.use((req, res) => {
    console.log('404 Not Found:', req.method, req.originalUrl); // Debug log
    res.status(404).json({
        status: 'fail',
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
    });
});

export default app; 