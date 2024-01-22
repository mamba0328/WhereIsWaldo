import React, {useState} from 'react';

// @ts-ignore
import waldoSki from '../public/imgs/waldo-ski.jpg';

import { Pointer } from "./types/types";

import Board from "./components/Board";
import { pointerStatuses } from "./consts/consts";
const App = () => {
    const [pointers, setPointers] = useState([] as Pointer[]);

    function getMousePos(event:any) {
        const rect = event.target.getBoundingClientRect();

        const x = event.clientX;
        const y = event.clientY;


        //position within the element in percentages to make img scalable without loosing coordinates
        //rect.left and rect.bottom - values that changes during scroll - so count them during calculations
        const relativeXPosition = ((x - rect.left)/(rect.right - rect.left)) * 100;
        const relativeYPosition = ((y - rect.top)/(rect.bottom - rect.top)) * 100;

        return [relativeXPosition, relativeYPosition];
    }
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


    return (
        <main>
            <Board imgUrl={waldoSki} handleClick={handleBoardClick} pointers={pointers}/>
        </main>
    );
};

export default App;