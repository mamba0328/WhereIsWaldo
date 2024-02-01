import React, {useEffect, useState, useCallback} from 'react';

import Pointer from '../Pointer';

import { Character, Pointer as PointerType }  from "../../types/types";
import ActionMenu from "../ActionMenu";
import {pointerStatuses} from "../../consts/consts";

type Props = {
    handleCharacterPositionGuess: Function,
    deletePendingPointer: Function,
    config: Character[],
    imgUrl: string,
    handleClick: Function,
    gameOver: boolean,
    pointers: PointerType[],
}
const Board = ({config, imgUrl, gameOver, handleClick, handleCharacterPositionGuess, deletePendingPointer, pointers, ...props}:Props) => {
    const initialImgSize = { width: 0, height: 0,}
    const [imgSize, setImgSize] = useState(initialImgSize);

    const getImgSize = useCallback(() => {
            const img = new Image();
            img.src = imgUrl;
            const { width, height} = img;
            setImgSize({width, height});
    }, [imgUrl])

    const renderPointers = () => {
        return pointers.map((item, index) => {
            return <Pointer {...item} key={index} deletePendingPointer={deletePendingPointer}/>
        })
    }

    const renderActionMenu = () => {
        const pendingPointer = pointers.find((item) => item.status === pointerStatuses.PENDING);

        if(!pendingPointer){
            return
        }

        const position = {x: pendingPointer.x, y: pendingPointer.y}

        return <ActionMenu config={config} position={position} handleCharacterPositionGuess={handleCharacterPositionGuess}/>
    }

    return (
        //board-wrapper here separates board with clickHandler and ActionMenu - so clickHandler wasn't triggered when click occurs inside ActionMenu
            <section className={`board-wrapper relative min-w-fit min-h-fit`}>
                <div className={`board overflow-scroll relative min-w-fit min-h-fit select-none`}
                    // style={{
                    //     backgroundImage: `url(${imgUrl})`,
                    //     backgroundSize: `${imgSize.width}px ${imgSize.height}px`,
                    //    }}
                     onClick={(event) => handleClick(event)}
                >
                    <img className={'select-none'} src={imgUrl} alt={'waldo map'} style={{minWidth: imgSize.width + 'px', minHeight: imgSize.height + 'px'}} onLoad={getImgSize}/>
                </div>
                {!gameOver && renderPointers()}
                {!gameOver && renderActionMenu()}
                <img src={'/imgs/icons/turn_phone.png'} className={'landscape:hidden portrait:inline-block fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}/>
            </section>
    );
};

export default Board;