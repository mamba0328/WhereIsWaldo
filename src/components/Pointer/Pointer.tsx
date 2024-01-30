import React from 'react';

import { pointerStatuses } from "../../consts/consts";

type Props = {
    x: number,
    y: number,
    status: string,
    deletePendingPointer: Function,
}
const Pointer = ({x, y, status, deletePendingPointer, ...props}:Props) => {

    const handleClick = () => {
        if(status === pointerStatuses.FOUNDED){
            return
        }

        deletePendingPointer();
    }

    return (
        <div className={`pointer pointer_${status === pointerStatuses.FOUNDED ? 'founded' : 'pending'}`} style={ {left:`${x}%`, top: `${y}%`}} onClick={handleClick}></div>
    );
};

export default Pointer;