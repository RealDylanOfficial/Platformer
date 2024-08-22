import { forwardRef, useEffect, useState } from "react";

// eslint-disable-next-line react/display-name
export const Pillar = forwardRef(({ position }, ref) => {
    const [randomNumber, setRandomNumber] = useState(null);
    const [randomNumber2, setRandomNumber2] = useState(null);

    useEffect(() => {
        // Generate a random number between 1 and 9
        const number = Math.floor(Math.random() * 9) + 1;
        setRandomNumber(number);
        const number2 = 70 + Math.floor(Math.random() * 30) + 1;
        setRandomNumber2(number2);
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
                width: 'auto',
                height: `${randomNumber2}px`,
            }}
        >
            <img
                src={`pillars/${randomNumber}.svg`}
                alt="Pillar"
                style={{
                    width: '100%',
                    height: `100%`,
                    objectFit: 'cover',
                }}
            />
        </div>
    );
});
