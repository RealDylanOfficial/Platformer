import React, { useState, useEffect } from 'react';
import { Game } from "@/components/game";

export default function Home() {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        // Randomly select background on component mount
        const isNight = Math.random() < 0.1; // 10% chance for night
        const image = isNight ? 'backgrounds/night.png' : 'backgrounds/day.png';
        setBackgroundImage(image);
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            position: 'relative', // Allows positioning of the image inside
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Centers the Game component both vertically and horizontally
            overflow: 'hidden', // Ensures no scrollbars appear
        }}>
            <img 
                src={backgroundImage} // Dynamically set image source
                alt="Background"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1, // Ensures the image is behind other content
                }}
            />
            <Game />
        </div>
    );
}



