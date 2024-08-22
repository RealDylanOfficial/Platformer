import { Game } from "@/components/game";

export default function Home() {
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
                src="backgrounds/day.png" // Update this path
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


