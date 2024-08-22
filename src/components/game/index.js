import React, { useState, useEffect } from 'react';
import { CharacterComponent } from "@/components/characters/Character";
import { characters } from "@/components/characters/Character";
import { Pillar } from "@/components/obstacles/Pillar";
import { Score } from "@/components/game/Score";
import { GameOver } from "@/components/game/GameOver";
import useGameEngine from "@/game_engine/game_engine";
import { CHAR_HEIGHT, CHAR_WIDTH, GAME_HEIGHT, GAME_WIDTH } from "@/constants/game";
import useCharacter from "@/game_engine/character";
import { generatePosition } from "@/utils/character";

export const USER_GENERATED_OBSTACLES = [
    { id: 1, position: generatePosition(), Component: Pillar },
    { id: 2, position: generatePosition(1.2), Component: Pillar },
    { id: 3, position: generatePosition(1.4), Component: Pillar },
    { id: 4, position: generatePosition(1.6), Component: Pillar }
];

export const Game = () => {
    const { charRef, charCoords, jumpClicked } = useCharacter();
    const { points, isGameOver, obstacleRefs, obstacles } = useGameEngine({
        charCoords
    });

    // State to manage the current character
    const [currentCharacter, setCurrentCharacter] = useState(characters.Gordon);

    // Handle key press to change character
    useEffect(() => {
        const handleKeyPress = (event) => {
            switch (event.key) {
                case '1':
                    setCurrentCharacter(characters.Tracy);
                    break;
                case '2':
                    setCurrentCharacter(characters.Dine);
                    break;
                case '3':
                    setCurrentCharacter(characters.MrBean);
                    break;
                case '4':
                    setCurrentCharacter(characters.Gordon);
                    break;
                case '5':
                    setCurrentCharacter(characters.Ainsley);
                    break;
                case '6':
                    setCurrentCharacter(characters.TheGc);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []); // Empty dependency array ensures this runs only once

    return (
        <>
            <div style={{
                position: 'relative',
                width: `${GAME_WIDTH}px`,
                height: `${GAME_HEIGHT}px`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CharacterComponent 
                    character={currentCharacter} 
                    ref={charRef} 
                    jumpClicked={jumpClicked} 
                />
                {obstacles.map((obstacle) => (
                    <obstacle.Component
                        key={obstacle.id}
                        ref={(el) => (obstacleRefs.current[obstacle.id] = el)}
                        position={obstacle.position}
                    />
                ))}
                {isGameOver && <GameOver />}
            </div>
            <div style={{
                position: 'fixed', // Fixed positioning to keep it in view
                bottom: '10px',   // Distance from the bottom of the viewport
                left: '50%',      // Center horizontally
                transform: 'translateX(-50%)', // Center horizontally
                textAlign: 'center',
                fontSize: '1.5em',
                fontWeight: 'bold',
                color: '#fff', // White text for better contrast
                backgroundColor: '#00247d', // British blue background
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: Shadow for better look
                border: '2px solid #cf142b', // British red border
                fontFamily: 'Times New Roman, serif' // British-inspired font
            }}>
                <div style={{
                    backgroundImage: 'url(/path-to-union-jack-image.jpg)', // Union Jack image
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '100px', // Adjust height as needed
                    width: '100%', // Adjust width as needed
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    opacity: 0.1, // Make the Union Jack background subtle
                }}></div>
                <p style={{ margin: '15px 0 15px 0' }}>Pigeons Collected</p>
                <Score points={parseInt(points / 10)} />
            </div>
        </>
    );
};
