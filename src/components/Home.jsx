import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="loading-screen">
                    <div className="loading-content">
                        <h2 className="loading-text">YorùbáTech</h2>
                        <div className="loading-bar-container">
                            <div className="loading-bar"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="background-animation"></div>
                    <Navbar />
                    <main>
                        <section id="hero">
                            <motion.div 
                                className="hero-content"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="hero-title">
                                    Learn <span className="gradient-text">Yorùbá</span> The <span className="gradient-text">Fun Way</span>
                                </h1>
                                <p className="hero-subtitle" style={{ textAlign: 'center' }}>
                                    Start your journey into the beautiful Yorùbá language 
                                    with interactive lessons and friendly guidance
                                </p>
                                <motion.button 
                                    className="cta-button"
                                    onClick={() => navigate('/login')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Learning 
                                    <motion.i 
                                        className="fas fa-arrow-right"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    />
                                </motion.button>
                            </motion.div>

                            <div className="decorative-elements">
                                {/* Books */}
                                <div className="doodle book book1">📚</div>
                                <div className="doodle book book2">📖</div>
                                
                                {/* Stars */}
                                <div className="doodle star star1">⭐</div>
                                <div className="doodle star star2">✨</div>
                                <div className="doodle star star3">⭐</div>
                                
                                {/* Learning symbols */}
                                <div className="doodle symbol symbol1">🎯</div>
                                <div className="doodle symbol symbol2">💡</div>
                                <div className="doodle symbol symbol3">🎨</div>
                                
                                {/* Circles */}
                                <div className="circle-decoration c1"></div>
                                <div className="circle-decoration c2"></div>
                                <div className="circle-decoration c3"></div>
                                
                                {/* Lines */}
                                <div className="line-decoration l1"></div>
                                <div className="line-decoration l2"></div>
                                
                                {/* Dots */}
                                <div className="dot-decoration d1"></div>
                                <div className="dot-decoration d2"></div>
                                <div className="dot-decoration d3"></div>
                            </div>
                        </section>
                    </main>
                </>
            )}
        </>
    );
}

export default Home; 