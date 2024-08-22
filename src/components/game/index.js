import {CharacterComponent} from "@/components/characters/Character";
import { characters } from "@/components/characters/Character";
import {Pillar} from "@/components/obstacles/Pillar";
import {Score} from "@/components/game/Score";
import {GameOver} from "@/components/game/GameOver";
import useGameEngine from "@/game_engine/game_engine";
import {CHAR_HEIGHT, CHAR_WIDTH, GAME_HEIGHT, GAME_WIDTH} from "@/constants/game";
import useCharacter from "@/game_engine/character";
import {generatePosition} from "@/utils/character";


export const USER_GENERATED_OBSTACLES = [
    { id: 1, position: generatePosition(), Component: Pillar },
    { id: 2, position: generatePosition(1.2), Component: Pillar },
    { id: 3, position: generatePosition(1.4), Component: Pillar },
    { id: 4, position: generatePosition(1.6), Component: Pillar }
]

export const Game = () => {
    const { charRef, charCoords, jumpClicked } = useCharacter();
    const { points, isGameOver, obstacleRefs, obstacles } = useGameEngine({
        charCoords
    });

    return (
        <div style={{
            position: 'relative',
            width: `${GAME_WIDTH}px`,
            height: `${GAME_HEIGHT}px`,
            overflow: 'hidden',
  
            display: 'flex',
        }}>
            <CharacterComponent 
                character={characters.Tracy} 
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
            {isGameOver && <GameOver/>}
            <Score points={parseInt(points / 10)}/>
        </div>
    );
}