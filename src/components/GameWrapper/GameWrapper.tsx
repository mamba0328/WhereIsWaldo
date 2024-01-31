import React, {useState, useCallback, useEffect,} from 'react';

import Board from "../Board";
import Menu from "../Menu";
import Leaderboard from "../Leaderboard/Leaderboard";

import { getCharacters } from "../../api/routes";

import { pointerStatuses, charStatuses} from "../../consts/consts";
import { Pointer, Character, Position, Map } from "../../types/types";
import { checkCharacterExistOn } from "../../api/routes";
import GameOverWindow from "../GameOverWindow/GameOverWindow";

type Props = {
    map: Map
}
const GameWrapper = ({map, ...props}:Props) => {
    //TODO:
    // - Select map;
    // - Prevent map interaction if gameover;
    // - Loader while checking response when check position?;
    // - LocalStorage?;

    const [gameOver, setGameOver] = useState(false);
    const [pointers, setPointers] = useState([] as Pointer[]);
    const [characters, setCharacters] = useState([] as Character[]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getSetCharacters();
        setLoaded(true);
    }, [map])

    useEffect(() => {
        if(!characters.length) return

        const allCharacterFounded = !characters.filter(character => character.status === charStatuses.UNFOUNDED).length;
        if(allCharacterFounded){
            setGameOver(true)
        }
    }, [characters])
    const getSetCharacters = async () => {
        const response = await getCharacters(map._id);
        response.data.forEach((item:Character) => item.status = 0);
        setCharacters(response.data)
    }

    const setCharacterIsFound = (character_id:string, timeTaken:number) => {
        const charactersIndex = characters.findIndex(character => character._id === character_id);
        const charactersClone = [...characters];
        charactersClone[charactersIndex] = {...charactersClone[charactersIndex], status: 1, timeTaken};
        setCharacters(charactersClone);
    }

    const settlePendingPointer = (name:string) => {
        const pointersClone = [...pointers];
        //always last
        const pendingPoint = pointersClone.pop();
        pendingPoint.status = pointerStatuses.FOUNDED;
        pendingPoint.name = name;
        pointersClone.push(pendingPoint);
        setPointers(pointersClone);
    }

    const setPointerStatusToWrongGuess = () => {
        const pointersClone = [...pointers];
        //always last
        const pendingPoint = pointersClone.pop();
        pendingPoint.status = pointerStatuses.WRONG;
        pointersClone.push(pendingPoint);
        setPointers(pointersClone);
    }

    const clearWrongGuessStatusFromPointer = () => {
        setTimeout(() => {
            const pointersClone = [...pointers];
            //always last
            const pendingPoint = pointersClone.pop();
            pendingPoint.status = pointerStatuses.PENDING;
            pointersClone.push(pendingPoint);
            setPointers(pointersClone);
        }, 300)
    }

    const deletePendingPointer = () => {
        setPointers(pointers.filter(pointer => pointer.status !== pointerStatuses.PENDING))
    }

    const getMousePos = useCallback((event:any) => {
        const rect = event.target.getBoundingClientRect();

        const x = event.clientX;
        const y = event.clientY;

        // console.log(rect, {x, y})

        //position within the element in percentages to make img scalable without loosing coordinates
        //rect.left and rect.bottom - values that changes during scroll - so count them during calculations
        const relativeXPosition = ((x - rect.left)/(rect.right - rect.left)) * 100;
        const relativeYPosition = ((y - rect.top)/(rect.bottom - rect.top)) * 100;

        return [relativeXPosition, relativeYPosition];
    }, [])


    const handleBoardClick = (event:React.FormEvent<EventTarget>) => {
        const [x, y] = getMousePos(event);
        const pointer = {
            x,
            y,
            status: pointerStatuses.PENDING,
        }

        // @ts-ignore
        const newPointers = pointers.at(-1)?.status === pointerStatuses.PENDING ?  pointers.toSpliced(-1, 1, pointer) : [...pointers, pointer];

        setPointers(newPointers);
    }

    const handleCharacterPositionGuess = async (character_id: string, position:Position) => {
        try {
            const payload = { point:position, map_id: map._id };
            const response = await checkCharacterExistOn(character_id, payload);
            const timeTaken = response.data.time_taken;

            if(response.data.exists){
                setCharacterIsFound(character_id, timeTaken);
                const character = characters.find(character => character._id === character_id);
                settlePendingPointer(character.name);
            } else{
                //toggles animation
                setPointerStatusToWrongGuess()
                clearWrongGuessStatusFromPointer()
            }

        } catch (error){
            console.log(error)
        }
    }

    if(!loaded){
        return <h1>Loading...</h1>
    }


    const score = Math.max(...characters.map(item => item.timeTaken));

    return (
        <main className={'main'}>
            {gameOver && <GameOverWindow map={map} score={score} />}
            <Board config={characters} imgUrl={map.path} handleClick={handleBoardClick} handleCharacterPositionGuess={handleCharacterPositionGuess} pointers={pointers} deletePendingPointer={deletePendingPointer}/>
            <Menu config={characters} />
        </main>
    );
};

export default GameWrapper;