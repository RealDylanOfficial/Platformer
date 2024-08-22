import { forwardRef, useEffect, useState } from "react";

// eslint-disable-next-line react/display-name
export const Pillar = forwardRef(({ position }, ref) => {
    const [randomNumber, setRandomNumber] = useState(null);

    useEffect(() => {
        // Generate a random number between 1 and 9
        const number = Math.floor(Math.random() * 9) + 1;
        setRandomNumber(number);
    }, []); // Empty array ensures this runs only once

    if (randomNumber === null) {
        return null; // or a loading spinner, etc.
    }

    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                right: `${position}px`,
                bottom: '0px',
                width: '70px',
                height: '100px',
            }}
        >
            <img
                src={`pillars/${randomNumber}.svg`}
                alt="Pillar"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </div>
    );
});
