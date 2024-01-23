import React, {useEffect, useState, useCallback} from 'react';

import Pointer from '../Pointer/Pointer';

import { Pointer as PointerType } from "../../types/types";

type Props = {
    imgUrl: string,
    handleClick: Function,
    pointers: PointerType[],
}
const Board = ({imgUrl, handleClick, pointers, ...props}:Props) => {
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

    return (
        <div className={`overflow-scroll relative min-w-fit min-h-fit select-none`}
             // style={{
             //     backgroundImage: `url(${imgUrl})`,
             //     backgroundSize: `${imgSize.width}px ${imgSize.height}px`,
             //    }}
             onClick={(event) => handleClick(event)}
        >
            <img className={'select-none'} src={imgUrl} alt={'waldo map'} style={{minWidth: imgSize.width + 'px', minHeight: imgSize.height + 'px'}} onLoad={getImgSize}/>
            {renderPointer()}
        </div>
    );
};

export default Board;