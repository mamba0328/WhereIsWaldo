import React from 'react';

import { pointerStatuses } from "../../consts/consts";

type Props = {
    x: number,
    y: number,
    name?:string,
    status: string,
    deletePendingPointer: Function,
}
const Pointer = ({x, y, status, name, deletePendingPointer, ...props}:Props) => {

    const pointerIsFounded = status === pointerStatuses.FOUNDED;
    const pointerIsWrong = status === pointerStatuses.WRONG;
    const pointerSubClass = pointerIsFounded ? 'founded' : pointerIsWrong ? 'wrong-guess' : 'pending';
    const handleClick = () => {
        if(status === pointerStatuses.FOUNDED){
            return
        }

        deletePendingPointer();
    }

    const translateTooltipX = x > 50 ? '-100%' : 0;
    const translateTooltipY = y > 50 ? '-50%' : 0;

    return (
        <div className={`pointer pointer_${pointerSubClass}`} style={ {left:`${x}%`, top: `${y}%`}} onClick={handleClick}>
            {pointerIsFounded && <span
                                    className={' pointer__tooltip absolute bottom-0 bg-secondaryBg bg-opacity-90 text-white font-bold p-2'}
                                    style={ {transform:`translate(${translateTooltipX}, ${translateTooltipY})`}}
                                >{name}
            </span>
            }
        </div>
    );
};

export default Pointer;