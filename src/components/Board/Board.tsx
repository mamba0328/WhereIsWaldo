import React, {useEffect, useState} from 'react';

import Pointer from '../Pointer/Pointer';

import { Pointer as PointerType } from "../../types/types";

type Props = {
    imgUrl: string,
    handleClick: Function,
    pointers: PointerType[],
}
const Board = ({imgUrl, handleClick, pointers, ...props}:Props) => {
    const [imgSize, setImgSize] = useState({
        width: 0,
        height: 0,
    });

    const renderPointer = () => {
        return pointers.map(item => {
            return <Pointer {...item} />
        })
    }

    useEffect(() => {
        const img = new Image();
        img.src = imgUrl;
        const { width, height} = img;
        setImgSize({width, height});
    }, [imgUrl])


    return (
        <div className={`overflow-scroll relative max-w-fit`}
             // style={{
             //     backgroundImage: `url(${imgUrl})`,
             //     backgroundSize: `${imgSize.width}px ${imgSize.height}px`,
             //    }}
             onClick={(event) => handleClick(event)}
        >
            <img src={imgUrl} alt={'waldo map'}/>
            {renderPointer()}
        </div>
    );
};

export default Board;