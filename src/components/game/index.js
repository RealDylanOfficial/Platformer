
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

const NUMBER_OF_OBSTACLES = 10;

const generateObstacles = () => {
    const obstacles = [];
    for (let i = 1; i <= NUMBER_OF_OBSTACLES; i++) {
        obstacles.push({
            id: i,
            position: generatePosition(1 + i * 0.2),
            Component: Pillar
        });
    }
    return obstacles;
};

export const USER_GENERATED_OBSTACLES = generateObstacles();

export const Game = () => {
    const { charRef, charCoords, jumpClicked } = useCharacter();
    const { points, isGameOver, obstacleRefs, obstacles } = useGameEngine({
        charCoords
    });

    const [currentCharacter, setCurrentCharacter] = useState(characters.Gordon);
    const [highScore, setHighScore] = useState(0);
    const [highScoreName, setHighScoreName] = useState('');

    useEffect(() => {
        const savedHighScore = parseInt(localStorage.getItem('highScore'), 10) || 0;
        const savedHighScoreName = localStorage.getItem('highScoreName') || '';
        setHighScore(savedHighScore);
        setHighScoreName(savedHighScoreName);
    }, []);

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
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (isGameOver) {
            const score = parseInt(points/10);
            if (parseInt(points/10) > highScore) {
                setHighScore(score);
                const playerName = prompt('New high score! Enter your name:');
                if (playerName) {
                    setHighScoreName(playerName);
                    localStorage.setItem('highScore', score);
                    localStorage.setItem('highScoreName', playerName);
                }
            }
        }
    }, [isGameOver, points, highScore]);

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
                {isGameOver && <GameOver highScore={highScore} highScoreName={highScoreName} onSaveHighScore={(name) => {
                    setHighScoreName(name);
                    localStorage.setItem('highScoreName', name);
                }} />}
            </div>
            <div style={{
                position: 'fixed',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                fontSize: '1.5em',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#00247d',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                border: '2px solid #cf142b',
                fontFamily: 'Times New Roman, serif'
            }}>
                <div style={{
                    backgroundImage: 'url(/path-to-union-jack-image.jpg)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    height: '100px',
                    width: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    opacity: 0.1,
                }}></div>
                <p style={{ margin: '15px 0 15px 0' }}>Pigeons Collected</p>
                <Score points={parseInt(points / 10, 10)} />
            </div>
        </>
    );
};
