import React, {useState} from 'react';

// @ts-ignore
import waldoSki from '../public/imgs/waldo-ski.jpg';

import { Pointer } from "./types/types";

import Board from "./components/Board";
import { pointerStatuses } from "./consts/consts";
const App = () => {
    //TODO: fix bug on scroll

    const [pointers, setPointers] = useState([] as Pointer[]);

    function getMousePos(event:any) {
        const rect = event.target.getBoundingClientRect();

        const x = event.clientX;
        const y = event.clientY;

        //position within the element in percentages to make img scalable without loosing coordinates
        const relativeXPosition = (x/rect.right) * 100;
        const relativeYPosition = (y/rect.bottom) * 100;

        console.log(rect, {x, y})
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