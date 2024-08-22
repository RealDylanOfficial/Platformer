import React, { useEffect, useRef } from 'react';

const quotes = [
    "Game Over: You Idiot Sandwich!",
    "Game Over: It's raw!",
    "Game Over: This is a disaster!",
    "Game Over: What are you? An idiot sandwich!",
    "Game Over: You donkey!",
    "Game Over: Where's the lamb sauce?",
    "I've never, ever, ever, ever met someone I believe in as little as you.",
    "This fish is so raw, it’s still finding Nemo!",
    "This chicken is so undercooked, a skilled vet could still save him!",
    "You used so much oil, the U.S. wanted to invade the plate!",
    "The pork is so raw, it's still singing 'Hakuna Matata'!",
    "This squid is so undercooked I can still hear it telling SpongeBob to f*** off!",
    "This pizza is so burnt, it wouldn’t even qualify as charcoal!",
    "You put so much ginger in this, it’s a Weasley!",
    "This salad is so fresh, it still has a social life!",
    "Congratulations, you’ve finally made a dish that even my dog wouldn’t eat!",
    "This beef is so raw it’s still moving!",
];

// Select a random quote
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

export const GameOver = () => {
    const audioRef = useRef(null);

    // Play the audio when the component mounts
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, []);

    return (
        <div style={{ 
            position: 'absolute', 
            top: '40%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            fontSize: '3em',
            fontWeight: 'bold',
            color: 'red',
            textShadow: '2px 2px 8px black',
            textAlign: 'center',
            fontFamily: '"Press Start 2P", cursive',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            border: '2px solid white',
        }}>
            {randomQuote}
            <audio ref={audioRef} src="audio/idiot_sandwich.mp3" />  {/* Update with the correct path */}
        </div>
    );
};
