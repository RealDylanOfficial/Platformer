import {forwardRef} from "react";

class Character {
    constructor(name, jumpHeight, speed, image) {
        this.name = name;
        this.jumpHeight = jumpHeight;
        this.speed = speed;
        this.image = image;
    }
}

// Example characters with image URLs
const Tracy = new Character('Tracy', 200, 2, 'characters/Tracy.jpg');
const Dine = new Character('Come Dine With Me', 200, 3, 'characters/Come dine with me guy.jpg');
const MrBean = new Character('Mr Bean', 150, 3, 'character/Mr Bean.jpg');
const Gordon = new Character('Gordon', 150, 4, 'characters/Gordon Ramsay.jpg');
const Ainsley = new Character('Ainsley', 200, 3, 'characters/Ainsley.jpg');
const TheGc = new Character('The GC', 200, 2, 'characters/The GC.jpg');


// Export the characters for use in other files
export const characters = { Tracy, Dine, MrBean, Gordon, Ainsley, TheGc };

// CharacterComponent to render each character
// eslint-disable-next-line react/display-name
export const CharacterComponent = forwardRef(({ character, jumpClicked }, ref) => {
    const handleClick = () => {
        const audio = new Audio('audio/bogoff.mp3');
        audio.play();
    };
    return (
        <div
            ref={ref}
            onClick={handleClick}
            style={{
                position: 'absolute',
                bottom: jumpClicked ? `${character.jumpHeight}px` : '0px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50px',
                height: '50px',
                backgroundImage: `url(${character.image})`,
                backgroundSize: 'cover',
                transition: `bottom 0.3s ease`,
            }}
        ></div>
    );
});
