import React, {useEffect, useState, useCallback} from 'react';

import Pointer from '../Pointer/Pointer';

import { Character, Pointer as PointerType }  from "../../types/types";
import ActionMenu from "../ActionMenu/ActionMenu";
import {pointerStatuses} from "../../consts/consts";

type Props = {
    config: Character[],
    imgUrl: string,
    handleClick: Function,
    pointers: PointerType[],
}
const Board = ({config, imgUrl, handleClick, pointers, ...props}:Props) => {
    const initialImgSize = { width: 0, height: 0,}
    const [imgSize, setImgSize] = useState(initialImgSize);

    const getImgSize = useCallback(() => {
            const img = new Image();
            img.src = imgUrl;
            const { width, height} = img;
            setImgSize({width, height});
    }, [imgUrl])

    const renderPointer = () => {
        return pointers.map(item => {
            return <Pointer {...item} />
        })
    }

    const renderActionMenu = () => {
        const pendingPointer = pointers.find((item) => item.status === pointerStatuses.PENDING);

        if(!pendingPointer){
            return
        }

        const position = {x: pendingPointer.x, y: pendingPointer.y}

        return <ActionMenu config={config} position={position}/>
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
                {renderPointer()}
            </div>
            {renderActionMenu()}
        </section>
    );
};

export default Board;