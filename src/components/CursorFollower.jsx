import { useEffect, useState } from 'react';

function CursorFollower() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trails, setTrails] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
            
            // Add new trail point
            setTrails(prev => [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }]
                .slice(-5)); // Keep only last 5 trail points
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div
                className="cursor-follower"
                style={{
                    transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
                    opacity: isVisible ? 0.6 : 0
                }}
            />
            {trails.map((trail, index) => (
                <div
                    key={trail.id}
                    className="cursor-trail"
                    style={{
                        transform: `translate(${trail.x - 4}px, ${trail.y - 4}px)`,
                        opacity: (index + 1) * 0.1
                    }}
                />
            ))}
        </>
    );
}

export default CursorFollower; 