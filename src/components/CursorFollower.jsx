import { useState, useEffect } from 'react';

function CursorFollower() {
    const [cursors, setCursors] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newCursor = {
                id: Date.now() + Math.random(), // Create a truly unique ID
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            };

            setCursors(prevCursors => {
                // Keep only the last few cursors to avoid performance issues
                const recentCursors = prevCursors
                    .filter(cursor => Date.now() - cursor.timestamp < 500)
                    .slice(-5);
                return [...recentCursors, newCursor];
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {cursors.map(cursor => (
                <div
                    key={cursor.id}
                    className="cursor-follower"
                    style={{
                        left: cursor.x,
                        top: cursor.y,
                        position: 'fixed',
                        pointerEvents: 'none',
                        transform: 'translate(-50%, -50%)',
                        transition: 'all 0.1s ease-out'
                    }}
                />
            ))}
        </>
    );
}

export default CursorFollower; 