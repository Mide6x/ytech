import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/NotFound.css';
function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="background-animation"></div>
            <div className="not-found-content">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    404 - Page Not Found
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Oops! The page you&apos;re looking for doesn&apos;t exist.
                </motion.p>
                <motion.button
                    className="cta-button"
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Go Home
                </motion.button>
            </div>
        </div>
    );
}

export default NotFound; 