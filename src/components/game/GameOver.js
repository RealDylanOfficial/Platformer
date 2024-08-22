import React, { useState, useEffect, useRef } from 'react';

// Define possible quotes
const quotes = [
    "You Idiot Sandwich!",
    "It's raw!",
    "This is a disaster!",
    "What are you? An idiot sandwich!",
    "You donkey!",
    "Where's the lamb sauce?",
    "I've never, ever, ever, ever met someone I believe in as little as you.",
    "This fish is so raw, it’s still finding Nemo!",
    "This chicken is so undercooked, a skilled vet could still save him!",
    "You used so much oil, the U.S. wanted to invade the plate!",
    "The pork is so raw, it's still singing 'Hakuna Matata'!",
    "This pizza is so burnt, it wouldn’t even qualify as charcoal!",
    "You put so much ginger in this, it’s a Weasley!",
    "This salad is so fresh, it still has a social life!",
    "Congratulations, you’ve finally made a dish that even my dog wouldn’t eat!",
    "This beef is so raw it’s still moving!",
];

// Select a random quote
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

export const GameOver = ({ highScore, highScoreName, onSaveHighScore }) => {
    const [name, setName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const audioRef = useRef(null);

    // Play the audio when the component mounts
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, []);

    // Show form if new high score is achieved
    useEffect(() => {
        if (highScore > 0 && !highScoreName) {
            setShowForm(true);
        }
    }, [highScore, highScoreName]);

    const handleNameChange = (e) => setName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            onSaveHighScore(name);
            setShowForm(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            fontSize: '3em',
            fontWeight: 'bold',
            color: 'red',
            textShadow: '0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px darkred, 0 0 50px darkred, 0 0 60px darkred, 0 0 70px darkred',
            textAlign: 'center',
            fontFamily: '"Press Start 2P", cursive',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            border: '2px solid white',
            animation: 'glow 1.5s infinite alternate, pulsate 1.5s'
        }}>
            <p>{randomQuote}</p>
            {showForm ? (
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your name"
                        style={{
                            padding: '10px',
                            fontSize: '1em',
                            borderRadius: '5px',
                            border: '1px solid white',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            color: 'black'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px',
                            marginLeft: '10px',
                            fontSize: '1em',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: 'red',
                            color: 'white'
                        }}
                    >
                        Save
                    </button>
                </form>
            ) : (
                <p style={{ fontSize: '1.5em', margin: '20px 0' }}>
                    High Score: {highScoreName ? `${highScore} by ${highScoreName}` : 'No high score yet'}
                </p>
            )}
            <audio ref={audioRef} src="audio/idiot_sandwich.mp3" />
            <style jsx>{`
                @keyframes glow {
                    from {
                        text-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red, 0 0 20px darkred, 0 0 25px darkred, 0 0 30px darkred, 0 0 35px darkred;
                    }
                    to {
                        text-shadow: 0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px darkred, 0 0 50px darkred, 0 0 60px darkred, 0 0 70px darkred;
                    }
                }
                @keyframes pulsate {
                    from {
                        transform: scale(1);
                    }
                    to {
                        transform: scale(1.1);
                    }
                }
            `}</style>
        </div>
    );
};
